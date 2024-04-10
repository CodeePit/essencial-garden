import { Banner } from "@/app/components/banner";
import ContactPeopleImage from "@/assets/contact-people.webp";
import ProductsBackgroundImage from "@/assets/products-background.webp";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FOOTER_INFO } from "@/mock/footer-infos";
import { MEDIAS } from "@/mock/medias";
import { rgbDataURL } from "@/utils/rgb-to-data-url";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Essencial Garden | Contato",
	description: "Entre em contato conosco para obter suporte personalizado e informações sobre nossos produtos.",
	keywords: "Essencial Garden, Contato, Suporte, Informações de contato",
};

export default function Page() {
	return (
		<>
			<Banner src="/placeholder.svg" alt="placeholder" />

			<section className="mt-10 mb-12 max-md:items-center flex justify-between max-w-screen-xl mx-auto gap-8 max-md:flex-col px-4">
				<div className="max-w-sm space-y-7 max-md:text-center">
					<h1 className="font-bold text-4xl text-secondary">
						Precisa de ajuda?
					</h1>
					<p className="md:pr-9">
						Se você tiver alguma dúvida, precisar de mais informações sobre
						nossos produtos, ou simplesmente quiser entrar em contato conosco,
						estamos aqui para ajudar!
						<br />
						<br />
						Nossa equipe dedicada está pronta para fornecer suporte
						personalizado.
					</p>
				</div>
				<form className="w-full max-w-md space-y-2">
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
					<label htmlFor="subject" className="sr-only">
						Assunto
					</label>
					<Input
						className="w-full"
						id="subject"
						name="subject"
						placeholder="Assunto*"
						required
					/>

					<label htmlFor="message" className="sr-only">
						Nos conte sobre o que você precisa
					</label>
					<Textarea
						className="w-full resize-none"
						id="message"
						name="message"
						placeholder="Mensagem:*"
						required
					/>

					<div className="flex items-center space-x-2">
						<Checkbox id="receive" />
						<label
							htmlFor="receive"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Aceito receber comunicações.
						</label>
					</div>

					<span className="text-xs block !mt-4 font-medium leading-none">
						Ao enviar a mensagem você concorda com a{" "}
						<Link href="#" className="underline underline-offset-2">
							política de privacidade
						</Link>
					</span>

					<Button className="w-fit self-center !mt-4" type="submit">
						ENVIAR MENSAGEM »
					</Button>
				</form>
			</section>

			<section className="relative mt-10">
				<Image
					src={ProductsBackgroundImage}
					sizes="100vw"
					alt=""
					placeholder="blur"
					blurDataURL={rgbDataURL(235, 238, 233)}
					className="object-cover w-full h-full absolute top-0 left-0 z-0 object-top"
				/>

				<div className="relative py-10 space-y-8 text-secondary px-4">
					<Image
						src={ContactPeopleImage}
						alt="Uma garota sorrindo segurando um vaso de plantas"
						placeholder="blur"
						blurDataURL={rgbDataURL(235, 238, 233)}
						className="absolute z-0 max-xs:opacity-40 min-w-[320px] min-2md:min-w-[40rem] max-2md:md:w-[60vw] max-md:w-[80vw] bottom-0 -right-32"
					/>

					<h2 className="text-4xl font-bold max-xs:text-center md:text-center">
						Nossos Contato
					</h2>
					<div className="max-w-screen-xl justify-between gap-x-8 md:gap-y-12 mx-auto md:py-16 flex">
						<div className="flex relative z-10 w-full gap-10 justify-between max-md:flex-col">
							<div className="w-full gap-4 flex max-xs:text-center max-xs:items-center max-xs:flex-col max-w-md justify-between">
								<div className="flex flex-col max-xs:items-center space-y-5">
									{FOOTER_INFO.map((item, index) => (
										<div key={index.toString()} className="flex space-x-2">
											<item.Icon className="mt-1 fill-secondary" />
											{item.description}
										</div>
									))}
								</div>
							</div>
							<div className="space-y-2 max-w-md max-xs:mx-auto max-xs:text-center">
								<h3 className="font-bold">Siga-nos!</h3>
								<ul className="flex gap-2">
									{MEDIAS.map((item, index) => (
										<li key={index.toString()}>
											<Link href={item.url}>
												<span className="sr-only">{item.label}</span>
												{item.icon}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
						<div className="max-w-md max-xs:hidden sm:w-full" />
					</div>
				</div>
			</section>
		</>
	);
}
