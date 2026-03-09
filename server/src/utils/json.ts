// SQLite stores arrays as JSON strings. These helpers handle serialization.

export function toJson(value: any): string {
  return JSON.stringify(value);
}

export function fromJson<T = any>(value: string): T {
  try {
    return JSON.parse(value);
  } catch {
    return [] as any;
  }
}
