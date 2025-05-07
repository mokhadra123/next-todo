export interface IApiHandlerConfig {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD';
    query?: Record<string, string | number | boolean | string[]>;
    body?: FormData | Record<string, string | number | boolean | null | undefined>;
    headers?: HeadersInit;
    json?:boolean
}