"use server";

import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";

export async function handleCategory(formData: FormData) {
	const cookiesStore = cookies();
	const supabase = createClient(cookiesStore);

	const data = {
		id: formData.get("id") as string,
		name: (formData.get("name") as string).trim(),
	};

	const { error } = await supabase.from("categories").upsert(data);
	if (error) throw "Erro ao salvar sua categoria";
}

export async function deleteCategory(id: string) {
	const cookiesStore = cookies();
	const supabase = createClient(cookiesStore);

	const { error } = await supabase.from("categories").delete().eq("id", id);
	if (error) throw `Erro ao deletar a categoria: ${id}`;
}
