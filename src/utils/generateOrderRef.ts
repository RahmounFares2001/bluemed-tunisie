const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

export function generateOrderRef(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  const suffix = CHARS[Math.floor(Math.random() * CHARS.length)] + CHARS[Math.floor(Math.random() * CHARS.length)];
  return `BMG-${num}-${suffix}`;
}
