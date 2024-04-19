import { Banner } from "@/app/components/banner";
import { getBanners, getCategories } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import type { Metadata } from "next";

import { Categories } from "./components/categories";
import { Products } from "./components/products";

export const metadata: Metadata = {
	title: "Essencial Garden | Contato",
	description:
		"Entre em contato conosco para obter suporte personalizado e informações sobre nossos produtos.",
	keywords: "Essencial Garden, Contato, Suporte, Informações de contato",
};
interface PageProps {
	searchParams: {
		[key: string]: string | null;
	};
}

export default async function Page(props: PageProps) {
	const categories_checked = props.searchParams.categorias
		?.split(",")
		.filter((s) => Boolean(s.length));

	const supabase = createClient();
	const categories = await getCategories(supabase, {
		skip: 0,
		take: 10,
	});
	const user = await supabase.auth.getUser();
	const banners = await getBanners(supabase, "produtos");

	return (
		<>
			<Banner
				title={banners[0]?.title || ""}
				src={
					banners.length
						? supabase.storage
								.from("banners")
								.getPublicUrl(`${banners[0].page}/${banners[0].banner}.webp`)
								.data.publicUrl
						: "/placeholder.svg"
				}
				alt=""
				edit={!!user.data.user?.id}
				multiple={false}
			/>

			<section className="mt-10 pb-32 max-md:justify-center items-center flex flex-col max-w-screen-xl mx-auto px-4">
				<h1 className="font-bold text-4xl text-secondary text-center">
					Conheça os produtos
					<br />
					da Essencial Garden
				</h1>

				<div className="flex max-md:flex-col mt-20 w-full gap-20">
					<aside className="md:sticky md:h-64 top-64">
						<h2 className="font-bold text-2xl text-primary">Categorias</h2>
						<Categories
							categories={categories}
							categoriesChecked={categories_checked || []}
						/>
					</aside>

					<Products categoriesChecked={categories_checked || []} />
				</div>
			</section>
		</>
	);
}
