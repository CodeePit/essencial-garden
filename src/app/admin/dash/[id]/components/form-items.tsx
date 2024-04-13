import ProductDetailsCard from "./product-details-card";
import ProductCategoryCard from "./product-category-card";
import ProductStatusCard from "./product-status-card";
import { Button } from "@/components/admin/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/admin/ui/badge";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import ProductImagesCard, { type FileItem } from "./product-images-card";
import { createClient } from "@/services/supabase";

export const FormItems = ({
	uploadPercentage,
	categories,
	product,
  setImages
}: {
	product?: {
		uri_id: string;
		name: string;
		description: string;
		keywords: string;
		id: string;
		status: string;
		images: string[];
		category: string;
	} | null;
	categories: { id: string; name: string }[];
  setImages: React.Dispatch<React.SetStateAction<(FileItem | string)[]>>
	uploadPercentage: number;
}) => {
  const supabase = createClient();
	const formStatus = useFormStatus();

	return (
		<>
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					disabled={formStatus.pending}
					size="icon"
					className="h-7 w-7"
					asChild
				>
					<Link href="/admin/dash">
						<ChevronLeft className="h-4 w-4" />
						<span className="sr-only">Back</span>
					</Link>
				</Button>
				<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
					{product ? "Editar" : "Criar"} Produto
				</h1>
				<Badge variant="outline" className="ml-auto sm:ml-0">
					In stock
				</Badge>
				<div className="hidden items-center gap-2 md:ml-auto md:flex">
					<Button
						variant="outline"
						disabled={formStatus.pending}
						size="sm"
						asChild
					>
						<Link href="/admin/dash">Descartar</Link>
					</Button>
					<Button type="submit" disabled={formStatus.pending} size="sm">
						{product ? "Salvar Produto" : "Criar Produto"}
					</Button>
				</div>
			</div>
			<div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
				<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<ProductCategoryCard
						defaultValue={product?.category}
						categories={categories}
					/>
					<ProductDetailsCard defaultValue={product} />
					{/* <StockCard /> */}
				</div>
				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<ProductStatusCard defaultValue={product?.status} />
					<ProductImagesCard
						uploadPercentage={uploadPercentage}
						loading={formStatus.pending}
						onChange={setImages}
						defaultImages={product?.images.map(
							(id) =>
								supabase.storage
									.from("products")
									.getPublicUrl(`${product.id}/${id}.webp`).data.publicUrl,
						)}
					/>
				</div>
			</div>
			<div className="flex items-center justify-center gap-2 md:hidden">
				<Button
					variant="outline"
					disabled={formStatus.pending}
					size="sm"
					asChild
				>
					<Link href="/admin/dash">Descartar</Link>
				</Button>
				<Button type="submit" disabled={formStatus.pending} size="sm">
					{product ? "Salvar Produto" : "Criar Produto"}
				</Button>
			</div>
		</>
	);
};
