export interface TransportRequest {
  endpoint: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  params?: Record<string, string | number | boolean>;
  body?: unknown;
  headers?: Record<string, string>;
}

export interface TransportResponse<T> {
  data: T;
  status: number;
  headers?: Record<string, string>;
}

export interface TransportError {
  code: string;
  message: string;
  status: number;
  details?: unknown;
}

export interface ApiTransport {
  request<T>(req: TransportRequest): Promise<TransportResponse<T>>;
}

export function createApiError(code: string, message: string, status = 500, details?: unknown): TransportError {
  return { code, message, status, details };
}
