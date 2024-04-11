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

export const Form = ({ product, categories }: { product: null, categories: {id: string, name: string}[] }) => {
	const supabase = createClient();
	const [loading, setLoading] = useState(false);
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const { toast } = useToast();

	async function handleUploadProductImages(id: string, files: FileItem[]) {
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
					return null;
				}

				return path;
			}),
		);
	}

	return (
		<form
			onSubmit={async (ev) => {
				ev.preventDefault();
				setLoading(true);

				const {
					keywords: { value: keywords },
					description: { value: description },
					uri_id: { value: uri_id },
					name: { value: name },
					category,
          status
				} = ev.currentTarget as EventTarget & HTMLFormElement &
					Record<
						"keywords" | "description" | "uri_id" | "name",
						HTMLInputElement
					> & Record<
            "category" | 'status',
            HTMLInputElement[]
          >;

        const data = { keywords, description, uri_id, name, status: status[1].value, category: category[1].value }

				setLoading(false);
			}}
			className="mx-auto grid max-w-screen-lg flex-1 auto-rows-max gap-4"
		>
			<div className="flex items-center gap-4">
				<Button variant="outline" size="icon" className="h-7 w-7">
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
					<Button variant="outline" size="sm" asChild>
						<Link href="/admin/dash">Descartar</Link>
					</Button>
					<Button type="submit" size="sm">
						{product ? "Salvar Produto" : "Criar Produto"}
					</Button>
				</div>
			</div>
			<div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
				<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
					<ProductDetailsCard />
					{/* <StockCard /> */}
				</div>
				<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
					<ProductCategoryCard categories={categories} />
					<ProductImagesCard />
					<ProductStatusCard />
				</div>
			</div>
			<div className="flex items-center justify-center gap-2 md:hidden">
				<Button variant="outline" size="sm" asChild>
					<Link href="/admin/dash">Descartar</Link>
				</Button>
				<Button type="submit" size="sm">
					{product ? "Salvar Produto" : "Criar Produto"}
				</Button>
			</div>
		</form>
	);
};
