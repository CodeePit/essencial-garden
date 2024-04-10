import { rgbDataURL } from "@/utils/rgb-to-data-url";
import Image from "next/image";
import LeafImage from "@/assets/leaf.webp";
import SalesTeamBackgroundImage from "@/assets/sales-team-background.webp";
import SalesTeamPeopleImage from "@/assets/sales-team-people.webp";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SalesTeam = () => (
	<section className="relative py-20">
		<Image
			src={SalesTeamBackgroundImage}
			sizes="100vw"
			alt=""
			placeholder="blur"
			blurDataURL={rgbDataURL(235, 238, 233)}
			className="object-cover w-full h-full absolute top-0 left-0 z-0 object-top"
		/>

		<Image
			src={LeafImage}
			alt=""
			placeholder="blur"
			blurDataURL={rgbDataURL(235, 238, 233)}
			className="absolute z-10 lg:top-0 top-10 -translate-y-1/2 left-8 -translate-x-1/2"
		/>
		<Image
			src={LeafImage}
			alt=""
			placeholder="blur"
			blurDataURL={rgbDataURL(235, 238, 233)}
			className="absolute z-10 lg:top-0 top-20 lg:-translate-y-1/2 right-8 translate-x-1/2"
		/>
		<Image
			src={LeafImage}
			alt=""
			placeholder="blur"
			blurDataURL={rgbDataURL(235, 238, 233)}
			className="absolute z-10 scale-50 lg:-top-14 max-lg:translate-y-1/2 top-0 right-0"
		/>

		<div className="flex justify-center relative max-w-screen-xl mx-auto">
			<Image
				src={SalesTeamPeopleImage}
				alt="Uma garota sorrindo segurando um vaso de plantas"
				placeholder="blur"
				blurDataURL={rgbDataURL(235, 238, 233)}
				className="absolute min-w-[32rem] -top-48 left-1/2 lg:-left-8 max-lg:-translate-x-1/2"
			/>

			<div className="relative max-lg:mt-[min(20rem,32rem)] lg:translate-x-1/2 py-12 h-fit px-14 bg-thirdly space-y-2 max-w-md rounded-3xl">
				<h2 className="text-4xl font-bold text-background">
					Fale com nosso time de vendas
				</h2>
				<p className="text-background">
					Tire dúvidas de nossos produtos com nosso time comercial online, baixe
					nossos catálogos e para se tornar um revendedor exclusivo da nossa
					basta clicar no botão abaixo.
				</p>
				<Button className="mt-2 mb-3" asChild>
					<Link href="/contato">Entre em contato »</Link>
				</Button>
			</div>
		</div>
	</section>
);
