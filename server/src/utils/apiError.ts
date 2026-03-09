export class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }

  static badRequest(msg: string) { return new ApiError(400, msg); }
  static unauthorized(msg = 'Non autorisé') { return new ApiError(401, msg); }
  static forbidden(msg = 'Accès interdit') { return new ApiError(403, msg); }
  static notFound(msg = 'Ressource introuvable') { return new ApiError(404, msg); }
  static conflict(msg: string) { return new ApiError(409, msg); }
}
