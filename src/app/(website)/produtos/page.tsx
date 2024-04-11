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
import { rgbDataURL } from "@/utils/rgb-to-data-url";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Essencial Garden | Contato",
	description:
		"Entre em contato conosco para obter suporte personalizado e informações sobre nossos produtos.",
	keywords: "Essencial Garden, Contato, Suporte, Informações de contato",
};

export default function Page() {
	return (
		<>
			<Banner src="/placeholder.svg" alt="placeholder" />

			<section className="mt-10 mb-32 max-md:justify-center items-center flex flex-col max-w-screen-xl mx-auto px-4">
				<h1 className="font-bold text-4xl text-secondary text-center">
					Conheça os produtos
					<br />
					da Essencial Garden
				</h1>

				<div className="flex mt-20 w-full gap-20">
					<aside>
						<h2 className="font-bold text-2xl text-primary">Categorias</h2>
						<ul className="flex flex-col mt-4 gap-2">
							<li className="flex items-center space-x-2">
								<Checkbox id="c1" />
								<label
									htmlFor="c1"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Nome Categoria
								</label>
							</li>
							<li className="flex items-center space-x-2">
								<Checkbox id="c2" />
								<label
									htmlFor="c2"
									className="text-sm whitespace-nowrap font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
								>
									Nome Categoria
								</label>
							</li>
						</ul>
					</aside>

					<ul className="w-full grid lg:grid-cols-3 sm:grid-cols-2 gap-8">
						{Array.from({ length: 10 }).map((_, index) => (
							<li
								key={index.toString()}
								className="w-full p-8 bg-background rounded-xl shadow-xl items-center flex flex-col space-y-4 lg:basis-1/5 md:basis-1/3 sm:basis-1/2"
							>
								<Image
									src="/product-placeholder.webp"
									alt="placeholder"
									placeholder="blur"
									blurDataURL={rgbDataURL(131, 170, 1)}
									width={180}
									height={256}
								/>
								<h3 className="text-xl font-bold text-secondary">
									Nome Produto
								</h3>

								<Separator />
								<div className="flex justify-between w-full px-2">
									<h4>Tamanhos</h4>
									<span>XX</span>
								</div>
								<Separator />

								<p className="line-clamp-5 text-center">
									Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
									diam nonummy nibh euismod tincidunt ut laoreet dolore magna
									aliquam. Lorem ipsum dolor sit amet, consectetuer adipiscing
									elit, sed diam nonummy nibh euismod tincidunt ut laoreet
									dolore magna aliquam.
								</p>

								<Button asChild>
									<Link href={`/produtos/${1}`}>Ver Produto »</Link>
								</Button>
							</li>
						))}
					</ul>
				</div>
			</section>
		</>
	);
}
