"use server";

import { createClient } from "@/services/supabase/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleBanners(
	pathname: string,
	deletedBanners: string[],
	banners: { id?: string; title: string; banner: string; page: string }[],
) {
	const cookiesStore = cookies();
	const supabase = createClient(cookiesStore);

	const { error } = await supabase
		.from("banners")
		.delete()
		.in("id", deletedBanners);

	const responses = await Promise.all(
		banners.map(async (banner) =>
			banner.id
				? await supabase
						.from("banners")
						.update({ title: banner.title, banner: banner.banner })
						.eq("id", banner.id)
				: await supabase.from("banners").insert(banner),
		),
	);

	revalidatePath(pathname, "page");

	if (responses.some(({ error }) => !!error)) {
		throw error
			? "Ocorreu um erro ao salvar/deletar alguns banners."
			: "Ocorreu um erro ao salvar alguns banners.";
	}

	if (error) {
		throw "Ocorreu um erro ao deletar alguns banners.";
	}
}
