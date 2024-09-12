import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/services/queries";
import { createClient } from "@/services/supabase";
import { RGB_GREEN_DATA_URL } from "@/utils/rgb-to-data-url";
import Image from "next/image";
import Link from "next/link";

export const ProductCard = ({
	product,
	innerRef,
}: {
	product: Product;
	innerRef?: (node?: Element | null | undefined) => void;
}) => {
	const supabase = createClient();

	return (
		<li
			key={product.id}
			className="w-full p-8 bg-background rounded-xl shadow-xl items-center flex flex-col space-y-4"
			ref={innerRef}
		>
			<div className="min-h-64 w-48">
				<Image
					src={
						supabase.storage
							.from("products")
							.getPublicUrl(`${product.id}/${product.images[0]}.webp`).data
							.publicUrl
					}
					alt="placeholder"
					placeholder="blur"
					blurDataURL={RGB_GREEN_DATA_URL}
					className="w-full h-full object-cover"
					width={500}
					height={500}
				/>
			</div>
			<h3 className="text-xl h-full w-full truncate font-bold text-secondary">
				{product.name}
			</h3>

			<Separator />
			<div className="flex justify-between w-full px-2">
				<h4>Tamanhos</h4>
				<span>XX</span>
			</div>
			<Separator />

			<p className="line-clamp-5 text-center h-full">{product.description}</p>

			<Button asChild>
				<Link href={`/produtos/${product.uri_id}`}>Ver Produto »</Link>
			</Button>
		</li>
	);
};
