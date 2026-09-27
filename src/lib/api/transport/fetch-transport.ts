import type { ApiTransport, TransportRequest, TransportResponse, TransportError } from "./types";
import { apiConfig } from "../config";

export class FetchTransport implements ApiTransport {
  private baseUrl: string;
  private timeoutMs: number;

  constructor(baseUrl?: string, timeoutMs?: number) {
    this.baseUrl = baseUrl ?? apiConfig.basePath;
    this.timeoutMs = timeoutMs ?? apiConfig.timeoutMs;
  }

  async request<T>(req: TransportRequest): Promise<TransportResponse<T>> {
    const url = this.buildUrl(req.endpoint, req.params);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(url, {
        method: req.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          ...req.headers,
        },
        body: req.body ? JSON.stringify(req.body) : undefined,
        signal: controller.signal,
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const error: TransportError = {
          code: (errorBody as { code?: string }).code ?? "HTTP_ERROR",
          message: (errorBody as { message?: string }).message ?? `HTTP ${response.status}`,
          status: response.status,
          details: errorBody,
        };
        throw error;
      }

      const data = (await response.json()) as T;
      return {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        const timeoutError: TransportError = {
          code: "TIMEOUT",
          message: "انتهت مهلة الطلب",
          status: 408,
        };
        throw timeoutError;
      }
      if ((err as TransportError).code) {
        throw err;
      }
      const unknownError: TransportError = {
        code: "UNKNOWN",
        message: (err as Error).message ?? "حدث خطأ غير متوقع",
        status: 500,
        details: err,
      };
      throw unknownError;
    } finally {
      clearTimeout(timeout);
    }
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;
    if (!params || Object.keys(params).length === 0) return url;

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      searchParams.append(key, String(value));
    }
    return `${url}?${searchParams.toString()}`;
  }
}

export const fetchTransport = new FetchTransport();
