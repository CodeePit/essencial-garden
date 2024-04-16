"use client";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/services/supabase";
import { type FileItem, handleUploadImages } from "@/services/upload-file";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleProduct } from "../actions";
import { FormItems } from "./form-items";

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
	const [uploadPercentage, setUploadPercentage] = useState(0);

	const { toast } = useToast();
	const [images, setImages] = useState<(FileItem | string)[]>([]);

	return (
		<form
			action={async (formData) => {
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
					const uploadSuccessStatus = await handleUploadImages(
						"products",
						res,
						images,
						{
							handleUploadPercentage: setUploadPercentage,
							toast,
							access_token: (await supabase.auth.getSession()).data.session
								?.access_token,
						},
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
			}}
			className="mx-auto grid max-w-screen-lg flex-1 auto-rows-max gap-4"
		>
			<FormItems
				categories={categories}
				setImages={setImages}
				uploadPercentage={uploadPercentage}
				product={product}
			/>
		</form>
	);
};
