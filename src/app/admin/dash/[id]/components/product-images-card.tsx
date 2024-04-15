"use client";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/admin/ui/card";
import { Progress } from "@/components/admin/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/utils/cn";
import { FileItem, handleUpload } from "@/services/upload-file";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProductImagesCard({
	defaultImages,
	onChange,
	loading,
	uploadPercentage = 0,
}: {
	onChange: (ev: (FileItem | string)[]) => void;
	defaultImages?: string[] | undefined;
	uploadPercentage?: number;
	loading?: boolean;
}) {
	const { toast } = useToast();
	const [files, setFiles] = useState<(FileItem | string)[]>(
		defaultImages || [],
	);

	const uploadOptions = {
		files,
		handleFiles: setFiles,
		toast,
	}

	useEffect(() => {
		onChange(files);
	}, [files, onChange]);

	return (
		<Card
			className={cn("overflow-hidden", {
				"opacity-50 pointer-events-none cursor-wait": loading,
			})}
			x-chunk="dashboard-07-chunk-4"
		>
			<CardHeader>
				<CardTitle>Imagens do Produto</CardTitle>
			</CardHeader>
			<CardContent>
				<Progress value={uploadPercentage * 100} className="h-1 mb-4 bg-muted" />

				<div className="grid gap-2">
					<label htmlFor="upload-banner">
						<Image
							role="button"
							alt="Imagem do produto"
							aria-label="Alterar Imagem Principal"
							className="aspect-square w-full rounded-md object-cover"
							height="300"
							src={
								typeof files[0] === "string"
									? files[0]
									: files[0]?.src || "/placeholder.svg"
							}
							width="300"
							onDragOver={(ev) => {
								ev.preventDefault();
							}}
							onDrop={(ev) => {
								ev.preventDefault();
								ev.stopPropagation();

								const file = ev.dataTransfer.files.item(0);
								if (file) handleUpload([file], 0, uploadOptions);
							}}
						/>
							<input
								type="file"
								id="upload-banner"
								accept="image/*"
								hidden
								onChange={(ev) => {
									const file = ev.target.files?.item(0)
									file && handleUpload([file], 0, uploadOptions);
									ev.target.value = "";
								}}
							/>
					</label>
					<div
						className="grid grid-cols-3 gap-2"
						onDragOver={(ev) => {
							ev.preventDefault();
						}}
						onDrop={(ev) => {
							ev.preventDefault();
							ev.stopPropagation();

							const files = ev.dataTransfer.files
								? Array.from(ev.dataTransfer.files)
								: [];
							handleUpload(files, true, uploadOptions);
						}}
					>
						{files.map((file, i) =>
							i === 0 ? null : (
								<button
									className="group relative rounded overflow-hidden"
									key={typeof file === "string" ? file : file.id}
									onClick={() => {
										setFiles((prev) => {
											const newPrev = [...prev];
											newPrev.splice(i, 1);
											return newPrev;
										});
									}}
									type="button"
								>
									<Image
										alt="Imagem do produto"
										className="aspect-square w-full rounded-md object-cover"
										height="84"
										src={
											typeof file === "string"
												? file
												: file.src || "/placeholder.svg"
										}
										width="84"
									/>

									<span className="sr-only">Deletar Imagem do Produto</span>

									<span
										aria-hidden
										className="absolute opacity-0 group-hover:opacity-100 transition flex justify-center text-background items-center top-0 left-0 w-full h-full bg-black/20"
									>
										<X />
									</span>
								</button>
							),
						)}
						<label
							id="upload-input"
							htmlFor="upload"
							className={cn(
								"cursor-pointer hover:bg-accent transition flex aspect-square w-full items-center justify-center rounded-md border border-dashed",
								{
									hidden: files.length >= 10,
								},
							)}
						>
							<Upload className="h-4 w-4 text-muted-foreground" />
							<span className="sr-only">Upload</span>

							<input
								type="file"
								name="upload"
								id="upload"
								accept="image/*"
								className="sr-only"
								multiple
								onFocus={() => document.getElementById("upload-input")?.focus()}
								required={files.length === 0}
								onChange={(ev) => {
									ev.target.files && handleUpload(Array.from(ev.target.files), true, uploadOptions);
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
