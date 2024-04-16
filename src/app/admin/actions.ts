"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const data = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const { error } = await supabase.auth.signInWithPassword(data);

	if (error?.message === "Invalid login credentials")
		throw "E-mail e Senha Inválidos";

	if (error) {
		redirect("/");
	}

	revalidatePath("/admin", "layout");
	redirect("/admin/dash");
}

export async function signOut() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	await supabase.auth.signOut();

	revalidatePath("/", "layout");
	redirect("/");
}
