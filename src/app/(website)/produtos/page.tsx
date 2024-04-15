import { Banner } from "@/app/components/banner";
import ContactPeopleImage from "@/assets/contact-people.webp";
import ProductsBackgroundImage from "@/assets/products-background.webp";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { FOOTER_INFO } from "@/mock/footer-infos";
import { MEDIAS } from "@/mock/medias";
import { getCategories, getProducts } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import { RGB_GREEN_DATA_URL, rgbDataURL } from "@/utils/rgb-to-data-url";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Essencial Garden | Contato",
	description:
		"Entre em contato conosco para obter suporte personalizado e informações sobre nossos produtos.",
	keywords: "Essencial Garden, Contato, Suporte, Informações de contato",
};

export default async function Page() {
	const supabase = createClient(cookies());
	const products = await getProducts(supabase, {
		get: "name,images,id,uri_id,description",
		skip: 0,
		take: 10,
	});

	const categories = await getCategories(supabase, {
		skip: 0,
		take: 10,
	});

	return (
		<>
			<Banner src="/placeholder.svg" alt="placeholder" />

			<section className="mt-10 mb-32 max-md:justify-center items-center flex flex-col max-w-screen-xl mx-auto px-4">
				<h1 className="font-bold text-4xl text-secondary text-center">
					Conheça os produtos
					<br />
					da Essencial Garden
				</h1>

				<div className="flex max-sm:flex-col mt-20 w-full gap-20">
					<aside>
						<h2 className="font-bold text-2xl text-primary">Categorias</h2>
						<ul className="flex max-sm:flex-wrap sm:flex-col mt-4 gap-8 max-sm:w-full max-sm:justify-center sm:gap-2">
							{categories.map((category) => (
								<li key={category.id} className="flex items-center space-x-2">
									<Checkbox id={category.id} />
									<label
										htmlFor={category.id}
										className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>
										{category.name}
									</label>
								</li>
							))}
						</ul>
					</aside>

					<ul className="w-full grid lg:grid-cols-3 md:grid-cols-2 gap-8">
						{products.map((product) => (
							<li
								key={product.id}
								className="w-full p-8 bg-background rounded-xl shadow-xl items-center flex flex-col space-y-4"
							>
								<div className="min-h-64 w-48">
									<Image
										src={
											supabase.storage
												.from("products")
												.getPublicUrl(`${product.id}/${product.images[0]}.webp`)
												.data.publicUrl
										}
										alt="placeholder"
										placeholder="blur"
										blurDataURL={RGB_GREEN_DATA_URL}
										className="w-full h-full object-fill"
										width={192}
										height={256}
									/>
								</div>
								<h3 className="text-xl h-full w-full truncate font-bold text-secondary">
									{product.name}
								</h3>

								<Separator />
								<div className="flex justify-between w-full px-2">
									<h4>Tamanhos</h4>
									<span>XX</span>
								</div>
								<Separator />

								<p className="line-clamp-5 text-center h-full">
									{product.description}
								</p>

								<Button asChild>
									<Link href={`/produtos/${product.uri_id}`}>
										Ver Produto »
									</Link>
								</Button>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
}
