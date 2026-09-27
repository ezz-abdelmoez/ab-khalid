export type ApiMode = "mock" | "http";
export type ProgressMode = "local" | "remote";

export interface ApiConfig {
  mode: ApiMode;
  basePath: string;
  internalUrl: string;
  timeoutMs: number;
  progressMode: ProgressMode;
}

function getEnv(name: string, fallback: string): string {
  return process.env[name] ?? fallback;
}

export function getApiConfig(): ApiConfig {
  const mode = (getEnv("NEXT_PUBLIC_API_MODE", "mock") as ApiMode) ?? "mock";
  return {
    mode: mode === "http" ? "http" : "mock",
    basePath: getEnv("NEXT_PUBLIC_API_BASE_PATH", "/api"),
    internalUrl: getEnv("API_INTERNAL_URL", "http://localhost:5067"),
    timeoutMs: Number.parseInt(getEnv("API_TIMEOUT_MS", "15000"), 10) || 15000,
    progressMode: (getEnv("NEXT_PUBLIC_PROGRESS_MODE", "local") as ProgressMode) === "remote" ? "remote" : "local",
  };
}

export const apiConfig = getApiConfig();
