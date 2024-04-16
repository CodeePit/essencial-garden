import { createClient } from "@/services/supabase/server";
import type { MetadataRoute } from "next";
import { cookies, headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const host = headers().get("x-url-host");
	const supabase = createClient(cookies(), "no-cache");
	const products = await supabase.from("products").select("uri_id,updated_at");

	return [
		{
			url: `https://${host}`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 1,
		},
		{
			url: `https://${host}/sobre`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: `https://${host}/catalogo`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: `https://${host}/contato`,
			lastModified: new Date(),
			changeFrequency: "yearly",
			priority: 0.8,
		},
		{
			url: `https://${host}/produtos`,
			lastModified: new Date(),
			changeFrequency: "monthly",
			priority: 0.9,
		},
		...(products.data || []).map(({ uri_id, updated_at }) => ({
			url: `https://${host}/produtos/${uri_id}`,
			lastModified: new Date(updated_at),
		})),
	];
}
