import { Banner } from "@/app/components/banner";
import AboutBackgroundImage from "@/assets/about-background.webp";
import AboutPeopleImage from "@/assets/about-people.webp";
import { getBanners, getVideo } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import { RGB_GRAY_DATA_URL, RGB_GREEN_DATA_URL } from "@/utils/rgb-to-data-url";
import type { Metadata } from "next";

import Image from "next/image";
import { MissionVisionValues } from "../components/mission-vision-values";
import { AboutVideo, VideoForm } from "./components/video";


export const metadata: Metadata = {
	title: "Essencial Garden | Produtos",
	description:
		"Conheça nossa linha de produtos especializados no cuidado com as plantas, desenvolvidos para atender às suas necessidades específicas.",
	keywords: "Essencial Garden, Produtos, Plantas, Cuidado com as plantas",
};

export default async function Page() {
	const supabase = createClient();
	const user = await supabase.auth.getUser();
	const banners = await getBanners(supabase, "sobre");
	const banners2 = await getBanners(supabase, "sobre-2");
	const video = await getVideo(supabase, "sobre");

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

			<section className="mt-10 grid lg:grid-cols-2 max-lg:text-center items-center gap-12 max-w-screen-xl px-4 mx-auto">
				<p className="w-full">
					Somos uma empresa especializada no cuidado com as plantas, focada
					principalmente no segmento de Home & Garden e oferecemos soluções para
					finalidades específicas.
					<br />
					<br />
					Nossa abordagem centrada no cliente nos permite entender as
					necessidades e desafios, permitindo-nos desenvolver produtos que
					atendam às suas demandas específicas.
					<br />
					<br />A sustentabilidade está no cerne de tudo o que fazemos.
					Priorizamos práticas agrícolas responsáveis que preservem os recursos
					naturais, promovam a saúde do solo e contribuam para um ambiente mais
					saudável.
					<br />
					<br />
					Nossa equipe é formada por profissionais altamente qualificados e
					apaixonados pelo que fazem. Estamos comprometidos em oferecer suporte
					personalizado e soluções sob medida para cada cliente, visando sempre
					a excelência em nossos produtos e serviços.
					<br />
					<br />
					Estamos ansiosos para trabalhar em parceria com você e ajudá-lo a
					alcançar seus objetivos.
				</p>
				<Image
					src={AboutPeopleImage}
					alt="Uma mulher sorrindo regando uma planta com um borrifador"
					placeholder="blur"
					blurDataURL={RGB_GREEN_DATA_URL}
					className="w-full"
					width={1920}
					height={720}
				/>
			</section>

			<section className="mt-5 relative">
				<Image
					src={AboutBackgroundImage}
					sizes="100vw"
					alt=""
					placeholder="blur"
					blurDataURL={RGB_GRAY_DATA_URL}
					className="object-cover w-full h-full absolute top-0 left-0 z-0 object-right-top"
				/>

				<div className="max-w-screen-xl mx-auto pt-28 px-4 space-y-12 relative pb-32">
					<MissionVisionValues />
					<div className="relative">
						<AboutVideo videoId={video.video} />
						{!!user.data.user?.id && (
		
							<VideoForm video={video} />
	
						)}
					</div>
				</div>
			</section>
			<Banner
				page="sobre-2"
				title={banners2[0]?.title || ""}
				src={
					banners2.length
						? supabase.storage
								.from("banners")
								.getPublicUrl(`${banners2[0].page}/${banners2[0].banner}.webp`)
								.data.publicUrl
						: "/placeholder.svg"
				}
				alt=""
				edit={!!user.data.user?.id}
				multiple={false}
			/>
		</>
	);
}
