"use client";
import ProductDetailsCard from "./product-details-card";
import ProductCategoryCard from "./product-category-card";
import ProductImagesCard, { type FileItem } from "./product-images-card";
import ProductStatusCard from "./product-status-card";
import { Button } from "@/components/admin/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/admin/ui/badge";
import Link from "next/link";
import { createClient, uploadFile } from "@/services/supabase";
import { useToast } from "@/components/ui/use-toast";
import { imageConversion } from "@/utils/image-conversion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleProduct } from "../actions";

export const Form = ({
	product,
	categories,
}: {
	product: {
		id: string;
		keywords: string;
		description: string;
		uri_id: string;
		name: string;
		status: string;
		category: string;
		search: string;
		images: string[];
	} | null;
	categories: { id: string; name: string }[];
}) => {
	const router = useRouter();
	const supabase = createClient();
	const [loading, setLoading] = useState(false);
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [images, setImages] = useState<(FileItem | string)[]>([]);
	const { toast } = useToast();

	async function handleUploadProductImages(
		id: string,
		files: (FileItem | string)[],
	) {
		const session = await supabase.auth.getSession();
		if (!session.data.session?.access_token || session.error) {
			toast({
				variant: "destructive",
				title: "Ops!",
				description: "Ocorreu um erro ao salvar seu produto.",
			});
			return;
		}

		return Promise.all(
			files.map(async (file) => {
				if (typeof file === "string") return true;

				const imageWebp = await imageConversion(file, {
					quality: 0.8,
					scale: 0.75,
				});

				const path = await uploadFile(
					"products",
					`${id}/${file.id}.webp`,
					imageWebp,
					{
						upsert: true,
						contentType: "image/webp",
						access_token: session.data.session?.access_token || "",
						onProgress: setUploadPercentage,
					},
				)
					.then((path) => path)
					.catch(() => null);

				if (!path) {
					return false;
				}

				return true;
			}),
		);
	}

	return (
		<form
			action={async (formData) => {
				setLoading(true);

				function getValueIfIsChange(
					defaultValue: string | undefined,
					value: FormDataEntryValue | null,
				) {
					return defaultValue !== value ? (value as string) : undefined;
				}

				const new_product = {
					search: undefined as string | undefined,
					keywords: getValueIfIsChange(
						product?.keywords,
						formData.get("keywords"),
					),
					description: getValueIfIsChange(
						product?.description,
						formData.get("description"),
					),
					uri_id: getValueIfIsChange(product?.uri_id, formData.get("uri_id")),
					name: getValueIfIsChange(product?.name, formData.get("name")),
					status: getValueIfIsChange(product?.status, formData.get("status")),
					category: getValueIfIsChange(
						product?.category,
						formData.get("category"),
					),
					images:
						images.some((image) => typeof image !== "string") ||
						images.length !== product?.images.length
							? images.map((file) => {
									if (typeof file === "string") {
										const paths = file.split("/");
										return paths[paths.length - 1].replace(".webp", "");
									}
									return file.id;
								})
							: undefined,
				};

				const categoryName = categories.find(
					(category) => category.id === formData.get("category"),
				)?.name;
				const search = `${new_product.name || product?.name}, ${
					new_product.status || product?.status
				}, ${categoryName}`;
				new_product.search = getValueIfIsChange(product?.search, search);

				try {
					const res = await handleProduct(product?.id, new_product);
					const uploadSuccessStatus = await handleUploadProductImages(
						res,
						images,
					);
					if (uploadSuccessStatus?.some((status) => !status)) {
						toast({
							variant: "destructive",
							title: "Ops!",
							description: "Ocorreu ao salvar algumas imagens do seu produto.",
						});
					}

					router.push("/admin/dash");
				} catch (e) {
					toast({
						variant: "destructive",
						title: "Ops!",
						description: (e as Error).message,
					});
				}

				setLoading(false);
			}}
			className="mx-auto grid max-w-screen-lg flex-1 auto-rows-max gap-4"
		>
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					disabled={loading}
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
					<Button variant="outline" disabled={loading} size="sm" asChild>
						<Link href="/admin/dash">Descartar</Link>
					</Button>
					<Button type="submit" disabled={loading} size="sm">
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
						loading={loading}
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
				<Button variant="outline" disabled={loading} size="sm" asChild>
					<Link href="/admin/dash">Descartar</Link>
				</Button>
				<Button type="submit" disabled={loading} size="sm">
					{product ? "Salvar Produto" : "Criar Produto"}
				</Button>
			</div>
		</form>
	);
};
