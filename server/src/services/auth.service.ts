import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../utils/password';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { ApiError } from '../utils/apiError';

const prisma = new PrismaClient();

export async function register(email: string, password: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw ApiError.conflict('Cet email est déjà utilisé');

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name },
  });

  const tokens = await generateTokens(user.id, user.role);
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ...tokens };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw ApiError.unauthorized('Email ou mot de passe incorrect');

  const valid = await comparePassword(password, user.passwordHash);
  if (!valid) throw ApiError.unauthorized('Email ou mot de passe incorrect');

  const tokens = await generateTokens(user.id, user.role);
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ...tokens };
}

export async function refresh(refreshToken: string) {
  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized('Refresh token invalide');
  }

  // Check token exists in DB
  const stored = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
  if (!stored || stored.expiresAt < new Date()) {
    if (stored) await prisma.refreshToken.delete({ where: { id: stored.id } });
    throw ApiError.unauthorized('Refresh token expiré');
  }

  // Delete old token
  await prisma.refreshToken.delete({ where: { id: stored.id } });

  // Issue new tokens
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) throw ApiError.unauthorized('Utilisateur introuvable');

  return generateTokens(user.id, user.role);
}

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw ApiError.notFound('Utilisateur introuvable');
  return { id: user.id, email: user.email, name: user.name, role: user.role, createdAt: user.createdAt };
}

async function generateTokens(userId: string, role: string) {
  const accessToken = signAccessToken({ userId, role });
  const refreshTokenStr = signRefreshToken({ userId, role });

  // Store refresh token
  await prisma.refreshToken.create({
    data: {
      token: refreshTokenStr,
      userId,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
  });

  return { accessToken, refreshToken: refreshTokenStr };
}
