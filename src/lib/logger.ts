// src/lib/logger.ts
export function logError(...args: unknown[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.error(...args);
  }
}
