/**
 * Isolated preparation module. NOT wired into the production Worker.
 * GISTDA API contract MUST be verified before setting endpoint and header name.
 */
export const WINDOWS = Object.freeze([
  { id: "p1", start: "2026-09-21", end: "2026-09-30" },
  { id: "p2", start: "2026-10-01", end: "2026-10-10" },
  { id: "p3", start: "2026-10-11", end: "2026-10-20" },
  { id: "p4", start: "2026-10-21", end: "2026-10-24" }
]);

export function classifyObservation(observationDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(observationDate || "")) return null;
  return WINDOWS.find(w => observationDate >= w.start && observationDate <= w.end)?.id ?? null;
}

/**
 * Requires verified endpoint and authentication method.
 * Intentionally refuses to send credentials to unverified destinations.
 */
export async function fetchVerifiedGistdaData(_env, _options = {}) {
  throw new Error("GISTDA API contract not verified: endpoint/authentication must be configured after reviewing official documentation");
}

export function verifiedObservation(record) {
  if (!record || typeof record !== "object") return null;
  const { observationDate, satellite, sourceId } = record;
  if (!classifyObservation(observationDate) ||
      typeof satellite !== "string" || !satellite.trim() ||
      typeof sourceId !== "string" || !sourceId.trim()) return null;
  return { observationDate, satellite, sourceId, period: classifyObservation(observationDate) };
}
