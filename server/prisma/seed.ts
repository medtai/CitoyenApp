import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/password';

const prisma = new PrismaClient();

// We'll dynamically import the data files from the parent project
async function main() {
  console.log('🌱 Seeding database...');

  // ── 1. CATEGORIES ─────────────────────────────────────────────────────────
  const categories = [
    { id: 'personnel', label: 'Questions personnelles', icon: '👤', sortOrder: 0 },
    { id: 'integration', label: 'Intégration', icon: '🤝', sortOrder: 1 },
    { id: 'geographie', label: 'Géographie', icon: '🗺️', sortOrder: 2 },
    { id: 'histoire', label: 'Histoire', icon: '📜', sortOrder: 3 },
    { id: 'culture', label: 'Culture générale', icon: '🎨', sortOrder: 4 },
    { id: 'monuments', label: 'Monuments', icon: '🏛️', sortOrder: 5 },
    { id: 'politique', label: 'Organisation politique', icon: '🏛️', sortOrder: 6 },
    { id: 'institutions', label: 'Institutions', icon: '⚖️', sortOrder: 7 },
    { id: 'europe', label: 'France & Europe', icon: '🇪🇺', sortOrder: 8 },
    { id: 'femmes', label: 'Figures féminines', icon: '👩', sortOrder: 9 },
    { id: 'devoirs', label: 'Devoirs du citoyen', icon: '📋', sortOrder: 10 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      update: { label: cat.label, icon: cat.icon, sortOrder: cat.sortOrder },
      create: cat,
    });
  }
  console.log(`✅ ${categories.length} catégories`);

  // ── 2. QUESTIONS ──────────────────────────────────────────────────────────
  // Import from the data file
  const { questions } = await import('../../data/questions');

  let questionCount = 0;
  for (const q of questions) {
    const legacyId = String(q.id);
    const existing = await prisma.question.findFirst({ where: { legacyId } });
    if (existing) continue;

    await prisma.question.create({
      data: {
        legacyId,
        categoryId: q.category,
        question: q.question,
        answer: q.answer || null,
        explanation: q.explanation,
        type: q.type,
        options: JSON.stringify(q.options || []),
        correctAnswers: JSON.stringify(q.correct_answers || []),
        difficulty: q.difficulty || 'medium',
        tags: JSON.stringify(q.tags || []),
      },
    });
    questionCount++;
  }
  console.log(`✅ ${questionCount} questions ajoutées (${questions.length} total)`);

  // ── 3. LEARNING CONTENT ───────────────────────────────────────────────────
  const { learningContent } = await import('../../data/learningContent');

  let topicCount = 0;
  for (const topic of learningContent) {
    const existing = await prisma.learningTopic.findFirst({
      where: { categoryId: topic.category },
    });
    if (existing) continue;

    await prisma.learningTopic.create({
      data: {
        categoryId: topic.category,
        title: topic.title,
        icon: topic.icon,
        introduction: topic.introduction,
        sections: JSON.stringify(topic.sections),
        keyFacts: JSON.stringify(topic.keyFacts),
        schema: JSON.stringify(topic.schema),
        example: topic.example,
        summary: topic.summary,
      },
    });
    topicCount++;
  }
  console.log(`✅ ${topicCount} sujets d'apprentissage`);

  // ── 4. ADMIN USER ─────────────────────────────────────────────────────────
  const adminEmail = 'admin@citoyen.app';
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        email: adminEmail,
        passwordHash: await hashPassword('admin123'),
        name: 'Admin',
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user créé (admin@citoyen.app / admin123)');
  }

  console.log('🎉 Seed terminé !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur seed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
