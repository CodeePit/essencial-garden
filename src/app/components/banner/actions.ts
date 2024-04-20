"use server";

import { createClient } from "@/services/supabase/server";
import { revalidateTag } from "next/cache";

export async function handleBanners(
	pathname: string,
	deletedBanners: string[],
	banners: { id?: string; title: string; banner: string; page: string }[],
) {
	const supabase = createClient();

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

	revalidateTag("supabase");

	if (responses.some(({ error }) => !!error)) {
		throw error
			? "Ocorreu um erro ao salvar/deletar alguns banners."
			: "Ocorreu um erro ao salvar alguns banners.";
	}

	if (error) {
		throw "Ocorreu um erro ao deletar alguns banners.";
	}
}
