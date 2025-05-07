import { IApiHandlerConfig } from "@/interfaces/general";
import { cookies } from "next/headers";

function ensureJson(headers: Headers) {
    if (!headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }
}

export async function apiHandler<T>(config: IApiHandlerConfig): Promise<T> {
    const { endpoint, method = "GET", query, headers = {}, body } = config;
    const BASE_URL = process.env.NEXT_DEV_BASE_URL || "https://iq.iraqtechno.com";

    // Handle missing BASE_URL
    if (!BASE_URL) {
        throw new Error("Missing BASE_URL");
    }

    // Get auth token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    // Prepare headers with auth token
    const reqHeaders = new Headers(headers);
    if (token) {
        reqHeaders.set("Authorization", `Bearer ${token}`);
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

    const requestOptions: RequestInit = { 
        method, 
        headers: reqHeaders,
        credentials: 'include' // Include cookies in the request
    };

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
    
    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`Expected JSON response but got ${contentType}`);
    }

    const data = await response.json();

    if (!response.ok) {
        const msg = data?.message ?? `HTTP error! status: ${response.status}`;
        throw new Error(msg);
    }

    return data as T;
}
