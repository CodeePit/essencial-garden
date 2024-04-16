import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/admin/ui/alert-dialog";
import { Button } from "@/components/admin/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { toast } from "@/components/ui/use-toast";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { deleteCategory } from "../actions";

export const DeleteCategory = ({
	id,
	index,
	handleCategories,
}: {
	id: string;
	index: number;
	handleCategories: React.Dispatch<
		React.SetStateAction<{ id: string; name: string }[]>
	>;
}) => {
	const [open, setOpen] = useState(false);

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<DropdownMenu modal={false}>
				<DropdownMenuTrigger asChild>
					<Button aria-haspopup="true" size="icon" variant="ghost">
						<MoreHorizontal className="h-4 w-4" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem>
							<Button className="w-full h-fit" variant="destructive">
								Deletar
							</Button>
						</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent className="p-0">
				<AlertDialogHeader className="p-6 pb-0">
					<AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
					<AlertDialogDescription>
						Essa ação não pode ser desfeita. Isso excluirá permanentemente sua
						categoria e <strong>TODOS os produtos atrelados a ela</strong>.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<form
					action={async () => {
						try {
							await deleteCategory(id);
							handleCategories((prev) => {
								const newPrev = [...prev];
								newPrev.splice(index, 1);
								return newPrev;
							});
						} catch (e) {
							toast({
								variant: "destructive",
								description: (e as Error).message,
								title: "Ops!",
							});
						}

						setOpen(false);
					}}
				>
					<div className="p-6 border-t bg-muted">
						<Label>
							Para executar essa ação, digite{" "}
							<strong>Deletar minha categoria</strong> abaixo:
						</Label>
						<Input
							aria-label="Texto de Verificação"
							pattern="\s*Deletar minha categoria\s*"
							required
							aria-invalid={false}
							autoCapitalize="none"
							autoComplete="off"
							autoCorrect="off"
							spellCheck={false}
							id={`verification-text-${id}`}
							type="text"
							name="verification_text"
						/>
					</div>
					<AlertDialogFooter className="border-t p-6">
						<AlertDialogCancel
							onClick={() => {
								const input = document.getElementById(
									`verification-text-${id}`,
								) as HTMLInputElement;

								if (input) input.value = "";
							}}
							type="button"
						>
							Cancel
						</AlertDialogCancel>
						<Button type="submit" variant="destructive">
							Deletar
						</Button>
					</AlertDialogFooter>
				</form>
			</AlertDialogContent>
		</AlertDialog>
	);
};
