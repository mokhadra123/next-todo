import { IApiHandlerConfig } from "@/interfaces/general";

function ensureJson(headers: Headers) {
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
}

export async function apiHandler<T = any>(config: IApiHandlerConfig): Promise<T> {
    const { endpoint, method = "GET", query, headers, body } = config;
    const BASE_URL = process.env.NEXT_DEV_BASE_URL || "https://iq.iraqtechno.com";

    if (!BASE_URL) {
        throw new Error("Missing BASE_URL");
    }

    // Build URL
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
    const url = new URL(`${BASE_URL}/${cleanEndpoint}`);
    if (query) {
        Object.entries(query).forEach(([k, v]) =>
            Array.isArray(v)
                ? v.forEach(val => url.searchParams.append(k, String(val)))
                : url.searchParams.set(k, String(v))
        );
    }

    // Prepare headers
    const reqHeaders = new Headers(headers);
    const requestOptions: RequestInit = { method, headers: reqHeaders };

    // Handle body for non-GET/HEAD
    if (!["GET", "HEAD"].includes(method) && body !== undefined) {
        if (body instanceof FormData) {
            requestOptions.body = body;
        } else {
            ensureJson(reqHeaders);
            requestOptions.body = JSON.stringify(body);
        }
    }

    // Perform fetch and normalize errors
    const response = await fetch(url.toString(), requestOptions);
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;
    if (!response.ok) {
        const msg = data?.message ?? `HTTP error! status: ${response.status}`;
        throw new Error(msg);
    }

    return data as T;
}
