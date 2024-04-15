import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { RGB_GREEN_DATA_URL, rgbDataURL } from "@/utils/rgb-to-data-url";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { BannerEditContent } from "./baner-edit-content";

export const BannerTrigger = () => {
	return (
		<DialogTrigger asChild>
			<Button
				variant="outline"
				className="absolute bottom-8 right-8 z-10 w-fit !p-4 h-auto"
			>
				<span className="sr-only">Editar Modal</span>
				<Pencil />
			</Button>
		</DialogTrigger>
	);
};

export const Banner = ({
	blurDataURL = RGB_GREEN_DATA_URL,
	edit = true,
	children,
	multiple = true,
	...props
}: {
	src: string;
	alt: string;
	blurDataURL?: string;
	edit?: boolean;
	multiple?: boolean;
	children?: React.ReactNode;
}) => {

	return (
		<div className="w-full relative">
			<Image
				sizes="100vw"
				placeholder="blur"
				blurDataURL={blurDataURL}
				className="mx-auto h-full !max-h-[720px] object-cover"
				width={1920}
				height={720}
				{...props}
			/>

			{edit ? (
				<Dialog>
					<BannerTrigger />
					<BannerEditContent multiple={multiple} />
				</Dialog>
			) : (
				children
			)}
		</div>
	);
};
