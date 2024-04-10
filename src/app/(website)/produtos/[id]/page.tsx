import {
	Carousel,
	CarouselContent,
	CarouselDots,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { rgbDataURL } from "@/utils/rgb-to-data-url";
import type { Metadata } from "next";
import Image from "next/image";
import { SalesTeam } from "../../components/sales-team";
import SpecificationsBackgroundImage from '@/assets/specifications-background.webp';

type Props = { params: { id: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const id = params.id;

	return {
		title: "",
		description: "",
		keywords: "",
		openGraph: {
			type: "website",
			url: `https://.../${id}`,
			images: [],
			description: "",
			siteName: "Essencial Garden",
		},
	};
}

export default function Page({ params }: Props) {
	const product = {};

	return (
		<>
			<div className="h-2 w-full bg-secondary" />

			<section className="max-w-screen-xl mx-auto max-lg:flex-col flex gap-20 mt-20 justify-between px-4">
				<div className="bg-white p-12 max-h-[490px] aspect-square rounded-xl shadow-xl">
					<Carousel>
						<CarouselContent>
							{Array.from({ length: 5 }).map((_, index) => (
								<CarouselItem key={index.toString()} className="w-auto h-full">
									<Image
										src="/product-placeholder.webp"
										alt="placeholder"
										placeholder="blur"
										blurDataURL={rgbDataURL(131, 170, 1)}
										className="w-auto !h-[380px] mx-auto object-cover"
										width={180}
										height={256}
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
					<h1 className="font-bold text-4xl text-secondary">Nome Produto</h1>
					<p>
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
						<br />
						<br />
						Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
					</p>
				</div>
			</section>

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
						<li className="max-w-md">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
							nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
							nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
						</li>
						<li className="max-w-md">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
							nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
							nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
						</li>
						<li className="max-w-md">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
							nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
						</li>
						<li className="max-w-md">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
							nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam.
						</li>
					</ul>
				</div>
			</section>

			<SalesTeam />
		</>
	);
}
