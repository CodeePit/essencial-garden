"use server";

import { createClient } from "@/services/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteProduct(id: string, name: string) {
	const cookiesStore = cookies();
	const supabase = createClient(cookiesStore);

	const { error } = await supabase.from("products").delete().eq("id", id);
	if (error) throw `Erro ao deletar o produto: ${name}`;

	revalidatePath("/admin/dash", "page");
}
