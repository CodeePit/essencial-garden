import { Banner } from "@/app/components/banner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getBanners } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import type { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
	title: "Essencial Garden | Catálogo",
	description:
		"Explore nossa ampla gama de catálogos técnicos completos. Encontre informações detalhadas sobre nossos produtos e benefícios para sua produção.",
	keywords: "Essencial Garden, Catálogo, Produtos, Especificações, Benefícios",
};

export default async function Page() {
	const supabase = createClient(cookies());
	const user = await supabase.auth.getUser();
	const banners = await getBanners(supabase, "contato");

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

			<section className="mt-10 mb-12 max-md:items-center flex justify-between max-w-screen-xl mx-auto gap-8 max-md:flex-col px-4">
				<div className="max-w-sm space-y-7 max-md:text-center">
					<h2 className="w-fit font-bold max-md:mx-auto text-2xl rounded-full py-1 px-4 text-primary border border-primary">
						Catálogo 2024
					</h2>
					<h1 className="font-bold text-4xl text-secondary">
						Explore nossa
						<br />
						ampla gama <br />
						de catálogos <br />
						técnicos completos.
					</h1>
					<p className="md:pr-9">
						Com informações detalhadas sobre nossos produtos, especificações e
						benefícios para sua produção, o catálogo é uma ferramenta essencial
						para o seu dia a dia.
					</p>
				</div>
				<form className="w-full max-w-md space-y-2">
					<h2 className="font-bold md:text-2xl text-xl max-md:text-center text-thirdly md:text-secondary !mb-5">
						Preencha seus dados
					</h2>

					<label htmlFor="name" className="sr-only">
						Digite seu nome
					</label>
					<Input
						className="w-full"
						type="text"
						id="name"
						name="name"
						placeholder="Nome*"
						required
					/>
					<label htmlFor="email" className="sr-only">
						Digite seu e-mail
					</label>
					<Input
						className="w-full"
						type="email"
						id="email"
						name="email"
						placeholder="E-mail*"
						required
					/>

					<h3 className="block !mt-4">Perfil*</h3>

					<RadioGroup required>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="pf" id="pf" />
							<label htmlFor="pf">Pessoa Física</label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="pj" id="pj" />
							<label htmlFor="pj">Pessoa Jurídica</label>
						</div>
					</RadioGroup>

					<h3 className="block !mt-4">
						Você já é cliente ativo da Essencial Garden?*
					</h3>

					<RadioGroup className="flex space-x-8">
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="yes" id="yes" />
							<label htmlFor="yes">Sim</label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="no" id="no" />
							<label htmlFor="no">Não</label>
						</div>
					</RadioGroup>

					<span className="text-xs block !mt-8 font-medium leading-none">
						Ao preencher o formulário, você está ciente que a nossa empresa
						poderá enviar, de tempos em tempos, comunicações e conteúdos de
						acordo com os seus interesses. Você pode modificar as suas
						permissões a qualquer tempo.
					</span>

					<Button className="w-fit self-center !mt-10" type="submit">
						BAIXAR CATÁLOGO »
					</Button>
				</form>
			</section>
		</>
	);
}
