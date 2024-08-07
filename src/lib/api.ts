import { env } from "@/env.mjs";

type ApiOptions = Parameters<typeof fetch>[1] & {
  query?: Record<string, string | number | boolean | undefined>;
};

export default async function api<T>(
  url: string,
  options: ApiOptions = {}
): Promise<T> {
  const { query, ...fetchOptions } = options;

  const urlObject = new URL(`${env.NEXT_PUBLIC_API_URL}/${url}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => { 
      if (value !== undefined) {
        urlObject.searchParams.append(key, value.toString());
      }
    });
  }

  const response = await fetch(urlObject.toString(), {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
