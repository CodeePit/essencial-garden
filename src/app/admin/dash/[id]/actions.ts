"use server";
import { createClient } from "@/services/supabase/server";
import { revalidatePath } from "next/cache";

export async function handleProduct(
	id: string | undefined,
	new_product: object,
) {
	const supabase = createClient();

	if (!Object.keys(new_product).length) return id;

	const { data, error } = id
		? await supabase
				.from("products")
				.update(new_product)
				.eq("id", id)
				.select("id")
				.single()
		: await supabase.from("products").insert(new_product).select("id").single();

	if (error?.message.includes('products_uri_id_key')){
		throw 'A "URL do Produto" precisa ser única dentre os produtos. Por favor selecione outra!'
	}
	if (error || !data?.id) {
		throw "Ocorreu um erro ao salvar seu produto.";
	}

	revalidatePath("/admin/dash", "page");
	revalidatePath("/produtos", "page");
	return data.id;
}
