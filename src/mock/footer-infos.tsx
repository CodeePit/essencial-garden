import { Icons } from "@/components/icons";
import { cn } from "@/utils/cn";

export const FOOTER_INFO = [
	{
		description: (
			<address className="not-italic">
				Nome da rua, 000
				<br />
				Bairro • Cidade / SP
				<br />
				CEP 00000-000
			</address>
		),
		Icon: (props: React.SVGAttributes<HTMLOrSVGElement>) => (
			<svg
				width="20"
				height="24"
				viewBox="0 0 20 24"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<title>Pin Endereço - Vetorizado</title>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M10.8763 23.6275C10.3963 24.1175 9.60625 24.1175 9.12625 23.6275L2.92625 17.3175C-0.973749 13.3575 -0.973749 6.9375 2.91625 2.9775C6.82625 -0.9925 13.1663 -0.9925 17.0663 2.9775C20.9663 6.9375 20.9663 13.3575 17.0663 17.3275L10.8663 23.6375L10.8763 23.6275ZM9.99625 21.6675L15.6463 15.9175C18.7763 12.7275 18.7763 7.5575 15.6463 4.3775C12.5263 1.1975 7.46625 1.1975 4.34625 4.3775C1.21625 7.5675 1.21625 12.7375 4.34625 15.9175L9.99625 21.6675Z"
					fill="currentColor"
				/>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M9.99625 7.9975C8.89625 7.9975 7.99625 8.8975 7.99625 9.9975C7.99625 11.0975 8.89625 11.9975 9.99625 11.9975C11.0963 11.9975 11.9963 11.0975 11.9963 9.9975C11.9963 8.8975 11.0963 7.9975 9.99625 7.9975ZM5.99625 9.9975C5.99625 7.7875 7.78625 5.9975 9.99625 5.9975C12.2063 5.9975 13.9963 7.7875 13.9963 9.9975C13.9963 12.2075 12.2063 13.9975 9.99625 13.9975C7.78625 13.9975 5.99625 12.2075 5.99625 9.9975Z"
					fill="currentColor"
				/>
			</svg>
		),
	},
	{
		description: <a href="tel:00000000000">00 00000.0000</a>,
		Icon: ({ className, ...props }: React.SVGAttributes<HTMLOrSVGElement>) => (
			<Icons.WhatsApp {...props} className={cn("!mt-0.5", className)} />
		),
	},
	{
		description: <a href="mailto:email@email.com.br">email@email.com.br</a>,
		Icon: (props: React.SVGAttributes<HTMLOrSVGElement>) => (
			<svg
				width="23"
				height="15"
				viewBox="0 0 23 15"
				fill="white"
				xmlns="http://www.w3.org/2000/svg"
				{...props}
			>
				<title>E-Mail - Vetorizado</title>
				<path
					d="M20.8073 15H2.19272C0.982402 15 0 14.0502 0 12.8799V2.12006C0 0.949848 0.982402 0 2.19272 0H20.8073C22.0176 0 23 0.949848 23 2.12006V12.8761C23 14.0464 22.0176 14.9962 20.8073 14.9962V15ZM1.17888 12.8799C1.17888 13.4195 1.63472 13.8602 2.19272 13.8602H20.8073C21.3653 13.8602 21.8211 13.4195 21.8211 12.8799V2.41261C21.7425 2.59878 21.5971 2.75836 21.4046 2.86474L11.9892 7.92173C11.8438 7.99772 11.6867 8.03951 11.5216 8.03951H11.4745C11.3133 8.03951 11.1522 7.99772 11.0068 7.92173L1.59542 2.86094C1.39894 2.75456 1.25747 2.59499 1.17888 2.40881V12.8799ZM2.24774 1.13982C2.34598 1.15881 2.44029 1.19301 2.52674 1.2386L11.498 6.06003L20.4733 1.2386C20.5636 1.18921 20.658 1.15881 20.7523 1.13982H2.24774Z"
					fill="currentColor"
				/>
			</svg>
		),
	},
];
