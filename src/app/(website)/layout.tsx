import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FOOTER_INFO } from "@/mock/footer-infos";
import { MEDIAS } from "@/mock/medias";
import { Menu } from "lucide-react";
import Link from "next/link";
import { sendSubscription } from "./actions";
import { NavLink } from "./components/nav-link";
import { Providers } from "./providers";

const LINKS = [
	{ href: "/sobre", label: "Quem somos" },
	{ href: "/produtos", label: "Produtos" },
	{ href: "/catalogo", label: "Catálogos" },
	{ href: "/contato", label: "Contato" },
];

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<Providers>
			<header className="sticky top-0 z-[99999] bg-background">
				<div className="h-2 w-full bg-thirdly" />
				<div className="py-8 relative max-w-screen-xl mx-auto justify-center lg:justify-between items-end flex px-4">
					<div className="absolute -top-2 right-4 z-[99]">
						<Link
							href="https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER_HERE"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-primary hover:bg-primary/80 text-background font-bold px-4 py-4 rounded-b-3xl flex items-center"
						>
							<Icons.WhatsApp className="w-6 h-6 mr-2" />
							<span>FALE CONOSCO</span>
						</Link>
					</div>
					
					<Link href="/">
						<span className="sr-only">Ir para Início</span>
						<Icons.Logo />
					</Link>
					<nav className="hidden lg:flex divide-x divide-primary">
						{LINKS.map((item) => (
							<NavLink
								className="px-10 hover:!border-b-primary border-b !border-b-transparent transition"
								key={item.href}
								href={item.href}
							>
								{item.label}
							</NavLink>
						))}
					</nav>
					<Sheet>
						<SheetTrigger asChild>
							<button
								type="button"
								className="shrink-0 lg:hidden hover:bg-secondary/10 p-2 transition rounded absolute top-4 right-4"
							>
								<Menu className="h-6 w-6 text-thirdly" />
								<span className="sr-only">Abrir/Fechar menu de navegação</span>
							</button>
						</SheetTrigger>
						<SheetContent side="right" className="w-full max-sm:h-fit">
							<nav className="grid gap-6 text-lg font-medium py-8">
								{LINKS.map((item) => (
									<SheetClose key={item.href} asChild>
										<NavLink href={item.href}>
											{item.label}
										</NavLink>
									</SheetClose>
								))}
							</nav>
						</SheetContent>
					</Sheet>
				</div>
			</header>
			
			<div className="fixed bottom-6 right-0 z-[99]">
				<Link
					href="https://api.whatsapp.com/send?phone=YOUR_PHONE_NUMBER_HERE"
					target="_blank"
					rel="noopener noreferrer"
					className="bg-primary hover:bg-primary/80 text-background px-4 py-4 flex items-center"
				>
					<Icons.WhatsApp className="w-8 h-8" />
					<span className="sr-only">Ir para WhatsApp</span>
				</Link>
			</div>
			<main className="w-full h-full bg-primary/5">{children}</main>
			<footer className="">
				<section className="text-center bg-primary text-background py-8">
					<div className="max-w-screen-xl px-4 mx-auto flex items-center space-y-4 flex-col">
						<h2 className="text-4xl font-bold">Receba nossas novidades</h2>
						<p className="max-w-[695px]">
							Através de nossos conteúdos, faça seu cadastro e acompanhe o nosso
							cenário de novidade, dicas e informações importantes.
						</p>

						<form
							action={sendSubscription}
							className="flex gap-4 w-full max-md:flex-col"
						>
							<label htmlFor="name" className="sr-only">
								Digite seu nome
							</label>
							<Input
								className="w-full"
								variant="secondary"
								type="text"
								id="name"
								name="name"
								placeholder="Digite seu nome"
								required
							/>
							<label htmlFor="email" className="sr-only">
								Digite seu e-mail
							</label>
							<Input
								className="w-full"
								variant="secondary"
								type="email"
								id="email"
								name="email"
								placeholder="Digite seu e-mail"
								required
							/>
							<Button
								className="w-fit self-center"
								size="lg"
								type="submit"
								variant="outline"
							>
								Enviar »
							</Button>
						</form>
					</div>
				</section>
				<section className="bg-gradient-dark px-4">
					<div className="max-w-screen-xl justify-between gap-x-8 gap-y-12 flex-wrap mx-auto py-16 text-background flex">
						<div className="flex-1 gap-4 flex max-xs:text-center max-xs:items-center max-xs:flex-col max-w-md justify-between">
							<div className="flex flex-col max-xs:items-center space-y-5">
								{FOOTER_INFO.map((item, index) => (
									<div key={index.toString()} className="flex space-x-2">
										<item.Icon className="mt-1" />
										{item.description}
									</div>
								))}
							</div>
							<nav className="flex flex-col gap-3">
								{LINKS.map((item) => (
									<Link
										key={item.href}
										href={item.href}
										className="hover:underline underline-offset-2 whitespace-nowrap"
									>
										{item.label}
									</Link>
								))}
							</nav>
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

						<div className="max-w-md max-xs:mx-auto">
							<Icons.Logo variant="secondary" />
						</div>
					</div>
				</section>
				<section className="flex items-center justify-center w-full p-2">
					<svg
						width="131"
						height="11"
						viewBox="0 0 131 11"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title lang="en-US">Intelligence by Core.Ag</title>
						<path
							d="M0 0.653014H1.12224V8.69167H0V0.653014Z"
							className="fill-primary"
						/>
						<path
							d="M8.96305 5.19374V8.69673H7.88531V5.32029C7.88531 4.12563 7.30195 3.53843 6.27859 3.53843C5.13658 3.53843 4.39501 4.237 4.39501 5.55821V8.69167H3.31727V2.60699H4.35052V3.5283C4.78557 2.90566 5.55185 2.55131 6.49117 2.55131C7.93969 2.55131 8.95811 3.40175 8.95811 5.19374H8.96305Z"
							className="fill-primary"
						/>
						<path
							d="M14.3023 8.33732C13.976 8.62586 13.4817 8.76254 13.0021 8.76254C11.8008 8.76254 11.1185 8.08422 11.1185 6.85412V3.51312H10.11V2.60699H11.1185V1.27566H12.1963V2.60699H13.9019V3.51312H12.1963V6.80856C12.1963 7.46157 12.5325 7.83111 13.1257 7.83111C13.4372 7.83111 13.7437 7.72987 13.9661 7.54257L14.3023 8.33732Z"
							className="fill-primary"
						/>
						<path
							d="M20.749 6.01887H15.9239C16.0574 7.08698 16.8978 7.80074 18.0794 7.80074C18.7764 7.80074 19.3598 7.55775 19.7949 7.06673L20.3881 7.78049C19.8492 8.42338 19.0286 8.7676 18.0448 8.7676C16.1266 8.7676 14.8461 7.4717 14.8461 5.65439C14.8461 3.83709 16.1117 2.55131 17.8322 2.55131C19.5526 2.55131 20.7737 3.81684 20.7737 5.68477C20.7737 5.77589 20.7638 5.91256 20.749 6.01887ZM19.7405 5.22411C19.6268 4.20156 18.8753 3.47768 17.8322 3.47768C16.789 3.47768 16.0376 4.19144 15.9239 5.22411H19.7405Z"
							className="fill-primary"
						/>
						<path
							d="M22.2667 0.172112H23.3445V8.69673H22.2667V0.172112Z"
							className="fill-primary"
						/>
						<path
							d="M25.3961 0.172112H26.4739V8.69673H25.3961V0.172112Z"
							className="fill-primary"
						/>
						<path
							d="M28.3327 0.723884C28.3327 0.323976 28.6491 0 29.0644 0C29.4797 0 29.7912 0.30879 29.7912 0.698573C29.7912 1.11367 29.4896 1.43258 29.0644 1.43258C28.6393 1.43258 28.3327 1.12379 28.3327 0.718822V0.723884ZM28.5255 2.60699H29.6033V8.69673H28.5255V2.60699Z"
							className="fill-primary"
						/>
						<path
							d="M37.3403 2.60699V7.86654C37.3403 10.0129 36.2724 10.9899 34.2554 10.9899C33.1677 10.9899 32.0702 10.6811 31.4177 10.0838L31.9318 9.23332C32.4806 9.71422 33.3457 10.0281 34.2208 10.0281C35.6248 10.0281 36.2625 9.35987 36.2625 7.98297V7.50207C35.7484 8.13484 34.9722 8.44363 34.1219 8.44363C32.4064 8.44363 31.1062 7.24896 31.1062 5.49241C31.1062 3.73585 32.4064 2.55131 34.1219 2.55131C35.0068 2.55131 35.8176 2.88541 36.3219 3.54855V2.60699H37.3403ZM36.2873 5.49241C36.2873 4.30787 35.4369 3.51818 34.2455 3.51818C33.054 3.51818 32.1938 4.31293 32.1938 5.49241C32.1938 6.67188 33.0442 7.47676 34.2455 7.47676C35.4468 7.47676 36.2873 6.66176 36.2873 5.49241Z"
							className="fill-primary"
						/>
						<path
							d="M44.7411 6.01887H39.916C40.0495 7.08698 40.8899 7.80074 42.0715 7.80074C42.7685 7.80074 43.3519 7.55775 43.787 7.06673L44.3802 7.78049C43.8413 8.42338 43.0207 8.7676 42.0369 8.7676C40.1187 8.7676 38.8382 7.4717 38.8382 5.65439C38.8382 3.83709 40.1039 2.55131 41.8243 2.55131C43.5447 2.55131 44.7658 3.81684 44.7658 5.68477C44.7658 5.77589 44.7559 5.91256 44.7411 6.01887ZM43.7326 5.22411C43.6189 4.20156 42.8674 3.47768 41.8243 3.47768C40.7812 3.47768 40.0297 4.19144 39.916 5.22411H43.7326Z"
							className="fill-primary"
						/>
						<path
							d="M51.8997 5.19374V8.69673H50.8219V5.32029C50.8219 4.12563 50.2386 3.53843 49.2152 3.53843C48.0732 3.53843 47.3316 4.237 47.3316 5.55821V8.69167H46.2539V2.60699H47.2872V3.5283C47.7222 2.90566 48.4885 2.55131 49.4278 2.55131C50.8763 2.55131 51.8947 3.40175 51.8947 5.19374H51.8997Z"
							className="fill-primary"
						/>
						<path
							d="M53.3828 5.64933C53.3828 3.83709 54.6929 2.54625 56.5221 2.54625C57.59 2.54625 58.4749 2.99172 58.9446 3.84215L58.1239 4.3838C57.7432 3.78647 57.1599 3.51312 56.5073 3.51312C55.3406 3.51312 54.4655 4.35343 54.4655 5.64933C54.4655 6.94524 55.3406 7.79567 56.5073 7.79567C57.1599 7.79567 57.7432 7.52232 58.1239 6.92499L58.9446 7.45145C58.4749 8.30189 57.585 8.76254 56.5221 8.76254C54.6929 8.76254 53.3828 7.46664 53.3828 5.64933Z"
							className="fill-primary"
						/>
						<path
							d="M65.5939 6.01887H60.7688C60.9023 7.08698 61.7427 7.80074 62.9243 7.80074C63.6214 7.80074 64.2047 7.55775 64.6398 7.06673L65.233 7.78049C64.6942 8.42338 63.8735 8.7676 62.8897 8.7676C60.9715 8.7676 59.6911 7.4717 59.6911 5.65439C59.6911 3.83709 60.9567 2.55131 62.6771 2.55131C64.3975 2.55131 65.6186 3.81684 65.6186 5.68477C65.6186 5.77589 65.6088 5.91256 65.5939 6.01887ZM64.5854 5.22411C64.4717 4.20156 63.7202 3.47768 62.6771 3.47768C61.634 3.47768 60.8825 4.19144 60.7688 5.22411H64.5854Z"
							className="fill-primary"
						/>
						<path
							d="M77.0388 6.52508C77.0388 7.90198 76.0154 8.69673 74.0329 8.69673H70.2856V0.653014H73.8055C75.61 0.653014 76.6235 1.43258 76.6235 2.73355C76.6235 3.60423 76.1884 4.21675 75.5705 4.52554C76.4554 4.77865 77.0388 5.45697 77.0388 6.52508ZM71.4078 1.58445V4.15601H73.7067C74.8487 4.15601 75.5012 3.72066 75.5012 2.87023C75.5012 2.01979 74.8487 1.58445 73.7067 1.58445H71.4078ZM75.9066 6.43396C75.9066 5.50253 75.2343 5.08744 73.9884 5.08744H71.4078V7.7653H73.9884C75.2343 7.7653 75.9066 7.36539 75.9066 6.43396Z"
							className="fill-primary"
						/>
						<path
							d="M83.8809 2.60699L80.9987 9.30419C80.4697 10.59 79.7875 10.9949 78.8778 10.9949C78.3044 10.9949 77.721 10.7975 77.3502 10.433L77.81 9.60791C78.1017 9.89646 78.4725 10.0534 78.8778 10.0534C79.392 10.0534 79.7183 9.8104 80.01 9.11183L80.2028 8.68661L77.5776 2.61206H78.6999L80.7762 7.48182L82.8279 2.61206H83.8809V2.60699Z"
							className="fill-primary"
						/>
						<path
							d="M92.4287 2.59181C92.0777 2.39439 91.7316 2.29821 91.3856 2.29821C90.9901 2.29821 90.6292 2.39945 90.3029 2.60193C89.9766 2.80442 89.7195 3.08283 89.5366 3.44225C89.3487 3.79659 89.2548 4.1965 89.2548 4.63184C89.2548 5.06719 89.3487 5.4671 89.5366 5.82144C89.7245 6.17579 89.9815 6.45927 90.3029 6.66176C90.6292 6.86424 90.9901 6.96549 91.3856 6.96549C91.7069 6.96549 92.0431 6.87943 92.3941 6.71238C92.7451 6.54533 93.0615 6.31247 93.3384 6.02393L94.5397 7.34514C94.1145 7.8058 93.6053 8.17027 93.022 8.44363C92.4337 8.71698 91.8552 8.85366 91.2768 8.85366C90.5006 8.85366 89.7986 8.67142 89.1658 8.30189C88.538 7.93235 88.0436 7.4312 87.6876 6.79844C87.3267 6.16567 87.1488 5.45191 87.1488 4.66222C87.1488 3.87253 87.3317 3.17902 87.6975 2.55131C88.0634 1.92361 88.5676 1.42752 89.2054 1.06811C89.8431 0.708698 90.56 0.526461 91.351 0.526461C91.9343 0.526461 92.5078 0.653014 93.0763 0.901058C93.6449 1.1491 94.1244 1.48827 94.5249 1.91855L93.3334 3.38656C93.0813 3.05752 92.7748 2.79429 92.4238 2.60193L92.4287 2.59181Z"
							className="fill-primary"
						/>
						<path
							d="M99.8295 2.80948C100.329 3.07271 100.719 3.44731 100.996 3.92315C101.273 4.40405 101.412 4.95582 101.412 5.58352C101.412 6.21123 101.273 6.77819 100.996 7.25403C100.719 7.72987 100.329 8.10446 99.8295 8.36769C99.3302 8.63093 98.7468 8.76254 98.0893 8.76254C97.4318 8.76254 96.8534 8.63093 96.3491 8.36769C95.8498 8.10446 95.4592 7.72987 95.1873 7.25403C94.9154 6.77312 94.777 6.21629 94.777 5.58352C94.777 4.95076 94.9154 4.40405 95.1873 3.92315C95.4592 3.44731 95.8449 3.07271 96.3491 2.80948C96.8484 2.54625 97.4318 2.41463 98.0893 2.41463C98.7468 2.41463 99.3253 2.54625 99.8295 2.80948ZM97.15 4.49011C96.9127 4.77358 96.7891 5.14312 96.7891 5.60377C96.7891 6.06443 96.9078 6.44409 97.15 6.72757C97.3873 7.01104 97.7037 7.15278 98.0943 7.15278C98.4848 7.15278 98.8062 7.01104 99.0484 6.72757C99.2857 6.44409 99.4093 6.06949 99.4093 5.60377C99.4093 5.13806 99.2857 4.77358 99.0435 4.49011C98.8012 4.20663 98.4848 4.06489 98.0943 4.06489C97.7037 4.06489 97.3923 4.20663 97.15 4.49011Z"
							className="fill-primary"
						/>
						<path
							d="M105.243 2.68799C105.574 2.49563 105.955 2.39945 106.38 2.39945V4.27243C106.311 4.26737 106.212 4.26231 106.078 4.26231C105.609 4.26231 105.228 4.37368 104.936 4.60147C104.645 4.82927 104.477 5.13806 104.432 5.52784V8.69673H102.435V2.48044H104.432V3.51312C104.64 3.1537 104.912 2.87529 105.243 2.68799Z"
							className="fill-primary"
						/>
						<path
							d="M112.204 3.30557C112.733 3.9029 113 4.72296 113 5.76576C113 5.92775 113 6.04924 112.99 6.1353H108.773C108.872 6.48965 109.04 6.75794 109.277 6.94524C109.514 7.13254 109.806 7.22872 110.152 7.22872C110.414 7.22872 110.666 7.17303 110.909 7.06673C111.151 6.96042 111.373 6.8035 111.576 6.59595L112.619 7.66406C112.303 8.02347 111.927 8.29682 111.482 8.48412C111.037 8.67142 110.533 8.7676 109.974 8.7676C109.322 8.7676 108.758 8.63599 108.269 8.37782C107.784 8.11965 107.408 7.75012 107.151 7.27428C106.894 6.79844 106.766 6.24666 106.766 5.61896C106.766 4.99126 106.894 4.4243 107.156 3.93833C107.418 3.45237 107.789 3.07777 108.269 2.81454C108.748 2.55131 109.302 2.4197 109.93 2.4197C110.918 2.4197 111.675 2.71836 112.209 3.31569L112.204 3.30557ZM111.057 5.04188C111.057 4.68247 110.953 4.39393 110.75 4.17625C110.543 3.95858 110.276 3.84722 109.94 3.84722C109.623 3.84722 109.361 3.95352 109.149 4.17119C108.936 4.3838 108.798 4.6774 108.728 5.04188H111.062H111.057Z"
							className="fill-primary"
						/>
						<path
							d="M115.318 7.07685C115.496 7.25909 115.585 7.49701 115.585 7.79061C115.585 8.08422 115.496 8.32213 115.318 8.50943C115.14 8.69673 114.908 8.79291 114.621 8.79291C114.335 8.79291 114.117 8.69673 113.939 8.50943C113.761 8.32213 113.672 8.08422 113.672 7.79061C113.672 7.49701 113.761 7.26415 113.934 7.07685C114.107 6.89462 114.339 6.8035 114.626 6.8035C114.913 6.8035 115.14 6.89462 115.323 7.07685H115.318Z"
							className="fill-primary"
						/>
						<path
							d="M122.546 8.69673L122.007 7.27428H118.606L118.057 8.69673H115.946L119.323 0.64289H121.434L124.731 8.69673H122.546ZM119.224 5.66452H121.399L120.321 2.79429L119.224 5.66452Z"
							className="fill-primary"
						/>
						<path
							d="M130.99 2.48044V8.14496C130.99 8.71698 130.852 9.22319 130.575 9.65347C130.298 10.0838 129.912 10.4179 129.413 10.6507C128.914 10.8836 128.34 11 127.693 11C127.183 11 126.694 10.9291 126.224 10.7823C125.755 10.6355 125.339 10.4432 124.978 10.1951L125.676 8.78279C125.952 8.97515 126.254 9.12195 126.575 9.22826C126.897 9.33456 127.223 9.39024 127.549 9.39024C127.999 9.39024 128.355 9.28394 128.617 9.07133C128.879 8.85872 129.008 8.56512 129.008 8.20064V7.53244C128.602 8.07409 128.029 8.34745 127.282 8.34745C126.783 8.34745 126.333 8.22089 125.943 7.97285C125.552 7.7248 125.245 7.37046 125.023 6.91486C124.801 6.45927 124.692 5.93787 124.692 5.34561C124.692 4.75334 124.796 4.25219 125.013 3.80672C125.226 3.36125 125.527 3.01703 125.918 2.77404C126.308 2.53106 126.748 2.40451 127.243 2.40451C127.618 2.40451 127.955 2.47538 128.256 2.61712C128.558 2.75886 128.81 2.96134 129.013 3.22964V2.47032H131L130.99 2.48044ZM128.667 6.45421C128.889 6.18592 129.003 5.83663 129.003 5.41141C129.003 4.98619 128.889 4.62172 128.667 4.35343C128.444 4.08514 128.147 3.95352 127.782 3.95352C127.416 3.95352 127.119 4.0902 126.892 4.36355C126.664 4.63691 126.551 4.98619 126.551 5.41647C126.551 5.84676 126.664 6.19604 126.892 6.45927C127.119 6.72757 127.416 6.85918 127.782 6.85918C128.147 6.85918 128.444 6.72757 128.667 6.45927V6.45421Z"
							className="fill-primary"
						/>
					</svg>
				</section>
			</footer>
		</Providers>
	);
}
