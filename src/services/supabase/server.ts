import { type CookieOptions, createServerClient } from "@supabase/ssr";
import type { cookies } from "next/headers";

export const createClient = (
	cookieStore: ReturnType<typeof cookies>,
	cache: RequestCache = "force-cache",
) => {
	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL || "",
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
		{
			global: {
				fetch: (input, init) =>
					fetch(input, {
						...init,
						cache,
						next: cache === "force-cache" ? { revalidate: 3600 } : undefined,
					}),
			},
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value, ...options });
					} catch (error) {
						// The `set` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
				remove(name: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value: "", ...options });
					} catch (error) {
						// The `delete` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
};
