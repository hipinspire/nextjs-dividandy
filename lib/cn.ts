export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | Record<string, boolean>
  | ClassValue[];

export function cn(...values: ClassValue[]) {
  const out: string[] = [];

  const visit = (v: ClassValue) => {
    if (!v) return;
    if (typeof v === "string" || typeof v === "number") {
      out.push(String(v));
      return;
    }
    if (Array.isArray(v)) {
      for (const item of v) visit(item);
      return;
    }
    if (typeof v === "object") {
      for (const [k, enabled] of Object.entries(v)) {
        if (enabled) out.push(k);
      }
    }
  };

  for (const v of values) visit(v);
  return out.join(" ");
}

