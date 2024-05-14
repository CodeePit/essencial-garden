import { cn } from "@/utils/cn";
import { RGB_GREEN_DATA_URL } from "@/utils/rgb-to-data-url";
import { sanitizeHTML } from "@/utils/sanitize-html";
import Image from "next/image";
import { BannerEditContent } from "./baner-edit-content";

export const Banner = ({
	blurDataURL = RGB_GREEN_DATA_URL,
	edit = true,
	children,
	multiple = true,
	title,
	page,
	className,
	containerClassName,
	...props
}: {
	src: string;
	alt: string;
	title: string;
	page?: string;
	className?: string;
	containerClassName?: string,
	blurDataURL?: string;
	edit?: boolean;
	multiple?: boolean;
	children?: React.ReactNode;
}) => {
	return (
		<div className={cn("w-full h-[80dvh] relative", containerClassName)}>
			<Image
				sizes="100vw"
				placeholder="blur"
				blurDataURL={blurDataURL}
				className={cn("mx-auto w-full h-full absolute object-cover", props.src.includes('13350137-09d1-4392-ae7d-40d880f94736') && 'object-[75%_0]')}
				width={1920}
				height={720}
				{...props}
			/>
			<div
				className={cn(
					"h-full lg:-bottom-4 w-full max-w-screen-xl mx-auto relative px-4 lg:pl-24",
					className,
				)}
			>
				<div className="w-full max-lg:py-20 lg:w-fit lg:h-1/2 h-full flex flex-col justify-between lg:justify-end items-center">
					<h1
						className="text-4xl py-2 font-bold text-background pointer-events-none"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
					/>
					{children}
				</div>
			</div>
			{edit && <BannerEditContent page={page} multiple={multiple} />}
		</div>
	);
};
