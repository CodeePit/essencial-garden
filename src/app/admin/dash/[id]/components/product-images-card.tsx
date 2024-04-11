"use client";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/admin/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { v4 as uuid } from "uuid";

export type FileItem = File & { id?: string; src?: string };

export function isFileTypeAccepted(accept: string, fileType: string) {
	if (accept.includes("*/*")) return true;

	const fileTypeFormatted = fileType.replace("jpg", "jpeg");
	const acceptTypes = accept.split(",").map((type) => type.trim());

	for (const type of acceptTypes) {
		if (type === fileTypeFormatted) return true;
		if (type.endsWith("*") && type.startsWith(fileTypeFormatted.split("/")[0]))
			return true;
		if (type.endsWith(fileTypeFormatted.split("/")[1])) return true;
	}
	return false;
}

export default function ProductImagesCard() {
	const { toast } = useToast();
	const [files, setFiles] = useState<FileItem[]>([]);

	const handleUpload = (files: File[], multiple = true) => {
		if (files.length >= 10) return toast({
			title: "Opa!",
			description: "Você só pode adicionar até 10 imagens.",
		})

		const filesMax = files as FileItem[];

		const filesMaxFiltered =
			"image/*" &&
			filesMax.filter((file: File) =>
				isFileTypeAccepted(
					"image/*",
					file.type.length ? file.type : `unknown/${file.name.split(".")[1]}`,
				),
			);

		if (filesMax?.length) {
			setFiles((prev) => {
				const newFiles = multiple
					? filesMaxFiltered || filesMax
					: [filesMaxFiltered[0] || filesMax[0]];

				return prev.concat(
					newFiles.map((file) => {
						file.id = uuid();
						file.src = URL.createObjectURL(file);
						return file;
					}),
				);
			});
		}
	};

	return (
		<Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
			<CardHeader>
				<CardTitle>Imagens do Produto</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-2">
					<Image
						alt="Imagem do produto"
						className="aspect-square w-full rounded-md object-cover"
						height="300"
						src={files[0]?.src || "/placeholder.svg"}
						width="300"
						onDrop={(ev) => {
							ev.preventDefault();
							ev.stopPropagation();

							const files = ev.dataTransfer.files
								? Array.from(ev.dataTransfer.files)
								: [];
							handleUpload(files, false);
						}}
					/>
					<div className="grid grid-cols-3 gap-2">
						{files.map((file, i) =>
							i === 0 ? null : (
								<button key={file.id} onClick={() => {
									setFiles((prev) => {
										const newPrev = [...prev];
										newPrev.splice(i, 1);
										return newPrev;
									})
								}} type="button">
									<Image
										alt="Imagem do produto"
										className="aspect-square w-full rounded-md object-cover"
										height="84"
										src={file.src || "/placeholder.svg"}
										width="84"
									/>
								</button>
							),
						)}
						<label
							htmlFor="upload"
							onDrop={(ev) => {
								ev.preventDefault();
								ev.stopPropagation();

								const files = ev.dataTransfer.files
									? Array.from(ev.dataTransfer.files)
									: [];
								handleUpload(files);
							}}
							className="cursor-pointer hover:bg-accent transition flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
						>
							<Upload className="h-4 w-4 text-muted-foreground" />
							<span className="sr-only">Upload</span>

							<input
								type="file"
								name="upload"
								id="upload"
								accept="image/*"
								hidden
								onChange={(ev) => {
									ev.target.files && handleUpload(Array.from(ev.target.files));
									ev.target.value = "";
								}}
							/>
						</label>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
