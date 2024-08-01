import { env } from "@/env.mjs";

export default function api(url: string, args?: Parameters<typeof fetch>[1]) {
  return fetch(`${env.NEXT_PUBLIC_API_URL}/${url}`, {
    ...args,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
