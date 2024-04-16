import { GoogleTagManager } from '@next/third-parties/google'
import { cn } from "@/utils/cn";
import { Montserrat as FontSans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR">
			<GoogleTagManager gtmId="GTM-TLJN56G5" />
			<head />
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
