import { cache } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";

export const getCategories = cache(
  async (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ctx: SupabaseClient<any, "public", any>,
    pagination: { skip: number; take: number }
  ) => {
    const { data, error } = await ctx
      .from("categories")
      .select("*")
      .range(pagination.skip, pagination.take);
    if (error) return [];
    return data;
  }
);

export type Product = {
	id: string;
	name: string;
	status: string;
	images: string[];
	created_at: string;
  uri_id: string;
  description: string;
	category: {
		id: string;
		name: string;
	};
};
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Filter = ReturnType<ReturnType<SupabaseClient<any, "public", any>["from"]>['select']>;

export const getProducts = cache(
  async (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ctx: SupabaseClient<any, "public", any>,
    options: {
      skip: number;
      take: number;
      search?: string;
      get?: string;
      filters?: (ctx: Filter) => Filter;
    }
  ) => {
    const format = !options.get;
    const get = "id,name,created_at,status,category,images,categories(name)" as '*';
    let products = ctx
      .from("products")
      .select((options.get as typeof get) || get);

    if (options.search) {
      products = products.ilike("search", `%${options.search}%`);
    }
		
		if (options.filters) {
			products = options.filters(products);
		}

    const { data, error } = await products.range(options.skip, options.take);

    if (error || !data) return [];
    return !format
      ? data as Product[]
      : data.map(({ images, category, categories, ...item }) => ({
          ...item,
          category: {
            id: category,
            name: (categories as unknown as { name: string }).name,
          },
          images: images.map(
            (id: string) =>
              ctx.storage.from("products").getPublicUrl(`${item.id}/${id}.webp`)
                .data.publicUrl
          ),
        })) as Product[];
  }
);

export const getProduct = cache(
  async (
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    ctx: SupabaseClient<any, "public", any>,
    id: string
  ) => {
    const { data, error } = await ctx
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) return null;
    return data;
  }
);
