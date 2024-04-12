import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getCategories = cache(
	async (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		ctx: SupabaseClient<any, "public", any>,
		pagination: { skip: number; take: number },
	) => {
		const { data, error } = await ctx
			.from("categories")
			.select("*")
			.range(pagination.skip, pagination.take);
		if (error) return [];
		return data;
	},
);

export const getProducts = cache(
	async (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		ctx: SupabaseClient<any, "public", any>,
		options: { skip: number; take: number; search: string },
	) => {
		let products = ctx
			.from("products")
			.select("id,name,created_at,status,category,images,categories(name)")
			
    if (options.search) {
      products = products.ilike("search", `%${options.search}%`)
    }

    const { data, error } = await products.range(options.skip, options.take);

		if (error || !data) return [];
		return data.map(({ images, category, categories, ...item }) => ({
			...item,
			category: {
				id: category,
				name: (categories as unknown as { name: string }).name,
			},
			images: images.map(
				(id: string) =>
					ctx.storage.from("products").getPublicUrl(`${item.id}/${id}.webp`)
						.data.publicUrl,
			),
		}));
	},
);

export const getProduct = cache(
	async (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		ctx: SupabaseClient<any, "public", any>,
		id: string,
	) => {
		const { data, error } = await ctx
			.from("products")
			.select("*")
			.eq("id", id)
			.single();
		if (error) return null;
		return data;
	},
);
