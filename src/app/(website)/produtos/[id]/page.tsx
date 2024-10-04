import SpecificationsBackgroundImage from "@/assets/specifications-background.webp";
import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { getProduct } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import { RGB_GREEN_DATA_URL, rgbDataURL } from "@/utils/rgb-to-data-url";
import { sanitizeHTML } from "@/utils/sanitize-html";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SalesTeam } from "../../components/sales-team";

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const host = headers().get("x-url-host");
	const supabase = createClient();
	const product = await getProduct(supabase, undefined, params.id);

	if (!product) return {};

	return {
		title: product.name,
		description: product.description,
		keywords: product.keywords || "",
		openGraph: {
			type: "website",
			url: `https://${host}/produtos/${product.uri_id}`,
			images: product.images.map(
				(image) =>
					supabase.storage
						.from("products")
						.getPublicUrl(`${product.id}/${image}.webp`).data.publicUrl,
			),
			description: product.description,
			siteName: "Essencial Garden",
		},
	};
}

export default async function Page({ params }: Props) {
	const supabase = createClient();
	const product = await getProduct(supabase, undefined, params.id, {
		filters: (ctx) => ctx.eq("status", "published"),
	});

	if (!product) notFound();

	return (
		<>
			<div className="h-2 w-full bg-secondary" />

			<section className="max-w-screen-xl mx-auto max-lg:flex-col flex gap-20 mt-20 justify-between px-4">
				<div className="bg-white p-12 max-h-[490px] aspect-square rounded-xl shadow-xl">
					<Carousel>
						<CarouselContent>
							{product.images.map((image) => (
								<CarouselItem key={image} className="w-auto h-full">
									<Image
										src={
											supabase.storage
												.from("products")
												.getPublicUrl(`${product.id}/${image}.webp`).data
												.publicUrl
										}
										alt=""
										placeholder="blur"
										blurDataURL={RGB_GREEN_DATA_URL}
										className="w-auto !h-[380px] mx-auto object-contain"
										width={1000}
										height={1000}
									/>
								</CarouselItem>
							))}
						</CarouselContent>
						<CarouselPrevious
							variant="ghost"
							className="-left-12 [&>.icon]:text-secondary/80 hover:[&>.icon]:!text-secondary"
						/>
						<CarouselNext
							variant="ghost"
							className="-right-12 [&>.icon]:text-secondary/80 hover:[&>.icon]:!text-secondary"
						/>
						<CarouselDots className="-bottom-8" variant="secondary" />
					</Carousel>
				</div>

				<div className="lg:max-w-lg space-y-10">
					<h1 className="font-bold text-4xl text-secondary">
						{product.name}
						<br />
						<span className="text-2xl">Tamanhos: {product.size}</span>
					</h1>
					<p
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{
							__html: sanitizeHTML(
								product.description.replaceAll("\n", "<br />"),
							),
						}}
					/>
				</div>
			</section>

			<div className="overflow-x-hidden">
				<section className="pt-20 pb-32 md:pt-20 md:pb-52 mt-20 px-4 relative">
					<Image
						src={SpecificationsBackgroundImage}
						sizes="100vw"
						alt=""
						placeholder="blur"
						blurDataURL={rgbDataURL(235, 238, 233)}
						className="object-cover w-full h-full absolute top-0 left-0 z-0 object-top"
					/>

					<div className="max-w-screen-xl mx-auto relative">
						<h2 className="font-bold text-2xl text-secondary">
							Características do Produto
						</h2>
						<ul className="mt-10 grid md:grid-cols-2 gap-4">
							{product.features.map((feat, i) => (
								<li
									key={i.toString()}
									className="max-w-md"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
									dangerouslySetInnerHTML={{
										__html: sanitizeHTML(
											product.description.replaceAll("\n", "<br />"),
										),
									}}
								/>
							))}
						</ul>
					</div>
				</section>

				<SalesTeam />
			</div>
		</>
	);
}
