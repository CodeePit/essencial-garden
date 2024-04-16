import { Button } from "@/components/admin/ui/button";
import { Textarea } from "@/components/admin/ui/textarea";
import type { FileItem } from "@/services/upload-file";
import { cn } from "@/utils/cn";
import { sanitizeHTML } from "@/utils/sanitize-html";
import { Eye, PenLine, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const BannerCard = ({
	file,
	title,
	onDelete,
	onTitleEdit,
}: {
	title: string;
	file: FileItem | string;
	onTitleEdit: (title: string) => void;
	onDelete: () => void;
}) => {
	const [open, setOpen] = useState(false);
	const id = typeof file === "string" ? file : file.id;

	return (
		<div className="group h-[170px] relative rounded overflow-hidden bg-black">
			<div>
				<Image
					alt="Imagem do produto"
					className={cn(
						"w-full h-full relative rounded-md object-center object-cover",
						open && "opacity-60",
					)}
					height={220}
					src={typeof file === "string" ? file : file.src || "/placeholder.svg"}
					width="440"
				/>
				{!open && (
					<span
						className="text-4xl truncate max-w-[calc(100%-2rem)] text-background font-bold absolute top-1/2 -translate-y-1/2 left-0 p-4"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
						dangerouslySetInnerHTML={{ __html: sanitizeHTML(title) }}
					/>
				)}
			</div>

			{open && (
				<div className="flex flex-col gap-2 h-full p-3 absolute top-0 left-0 w-full">
					<div className="flex gap-2 items-center justify-between">
						<label
							className="text-lg font-medium text-background"
							htmlFor={`banner-content-${id}`}
						>
							Texto do banner:
						</label>
						<Button
							variant="ghost"
							className="hover:bg-white/20 text-background hover:text-background"
							onClick={() => setOpen(false)}
							title="Ver preview"
						>
							<span className="sr-only">Ver Preview</span>
							<Eye />
						</Button>
					</div>
					<Textarea
						value={title.replaceAll("<br />", "\n")}
						onChange={({ target: { value } }) =>
							onTitleEdit(value.replaceAll("\n", "<br />"))
						}
						placeholder="..."
						id={`banner-content-${id}`}
						className="caret-background h-full bg-transparent font-bold text-xl text-background ring-offset-black max-h-full resize-none"
					/>
				</div>
			)}

			{!open && (
				<div className="group-hover:bg-black/40 items-center justify-center space-x-4 flex top-0 left-0 transition absolute w-full h-full">
					<Button
						variant="ghost"
						className="hover:bg-white/20 opacity-0 group-hover:opacity-100 hover:text-destructive text-background"
						onClick={onDelete}
						title="Deletar imagem do produto"
					>
						<span className="sr-only">Deletar Imagem do Produto</span>
						<Trash />
					</Button>
					<Button
						variant="ghost"
						className="hover:bg-white/20 opacity-0 group-hover:opacity-100 text-background hover:text-background"
						onClick={() => setOpen(true)}
						title="Editar banner"
					>
						<span className="sr-only">Editar Banner</span>
						<PenLine />
					</Button>
				</div>
			)}
		</div>
	);
};
