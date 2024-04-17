"use server";

import { createClient } from "@/services/supabase/server";
 

export async function handleCategory(formData: FormData) {
	const supabase = createClient();

	const data = {
		id: formData.get("id") as string,
		name: (formData.get("name") as string).trim(),
	};

	const { error } = await supabase.from("categories").upsert(data);
	if (error) throw "Erro ao salvar sua categoria";
}

export async function deleteCategory(id: string) {
	const supabase = createClient();

	const { error } = await supabase.from("categories").delete().eq("id", id);
	if (error) throw `Erro ao deletar a categoria: ${id}`;
}
