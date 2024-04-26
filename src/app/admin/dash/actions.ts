"use server";

import { createClient } from "@/services/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteProduct(id: string, name: string) {
	const supabase = createClient();

	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) return `Erro ao deletar o produto: ${name}`;

	revalidatePath("/admin/dash", "page");
}
