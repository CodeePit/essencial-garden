"use client";
import { Button } from "@/components/admin/ui/button";
import { MoreHorizontal } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/admin/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/admin/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { generateRandomCode } from "@/utils/generate-random-code";
import { useMemo, useState } from "react";
import { deleteCategory, handleCategory } from "../actions";
import { DeleteCategory } from "./delete-category";

export const TableForm = (props: {
	categories: { id: string; name: string }[] | null;
}) => {
	const { toast } = useToast();
	const [updatedCategories, setUpdatedCategories] = useState(new Set());
	const [categories, setCategories] = useState<{ id: string; name: string }[]>(
		props.categories ? [...props.categories] : [],
	);
	const categoriesIds = useMemo(
		() => new Set(categories?.map(({ id }) => id)) || [],
		[categories],
	);

	function createCategory() {
		setCategories((prev) => {
			let id = generateRandomCode(5);
			while (true) {
				if (categoriesIds.has(id)) id = generateRandomCode(5);
				else break;
			}
			setUpdatedCategories((prev) => new Set(prev.add(id)));
			return [{ id, name: "" }, ...prev];
		});
	}

	if (categories?.length) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Categoria</CardTitle>
					<CardDescription>
						Clique em cima do nome da categoria para editar.
					</CardDescription>

					{categories.length < 10 && (
						<Button className="mt-4 w-fit self-end" onClick={createCategory}>
							Criar Categoria
						</Button>
					)}
				</CardHeader>
				<CardContent>
					<Table className="overflow-x-auto">
						<TableHeader>
							<TableRow>
								<TableHead className="w-24">ID</TableHead>
								<TableHead>Nome</TableHead>
								<TableHead>
									<span className="sr-only">Ações</span>
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories.map((category, i) => (
								<TableRow key={category.id} className="group">
									<TableCell className="truncate max-w-0 font-medium">
										{category.id.toUpperCase()}
									</TableCell>
									<TableCell
										title={category.name}
										className="font-medium max-w-0 2xs:table-cell hidden"
									>
										<form
											action={async (formData) => {
												try {
													await handleCategory(formData);
													setUpdatedCategories((prev) => {
														prev.delete(category.id);
														return new Set(prev);
													});

													if (!props.categories) {
														props.categories = [category];
														return;
													}

													const categoryIndex = props.categories.findIndex(
														({ id }) => id === category.id,
													);
													if (categoryIndex > -1) {
														props.categories[categoryIndex].name = (
															formData.get("name") as string
														).trim();
														return;
													}

													props.categories = [category, ...props.categories];
												} catch (e) {
													toast({
														variant: "destructive",
														description: (e as Error).message,
														title: "Ops!",
													});
												}
											}}
											className="flex items-center gap-4"
										>
											<input
												name="id"
												id="id"
												value={category.id}
												type="text"
												hidden
											/>
											<input
												name="name"
												id="name"
												value={category.name}
												onChange={(ev) => {
													const previewsValue = props.categories?.find(
														(categoryInitial) =>
															categoryInitial.id === category.id,
													);

													setCategories((prev) => {
														prev[i].name = ev.target.value;
														return [...prev];
													});

													const isCategoryUpdated = updatedCategories.has(
														category.id,
													);
													const hasValueChanges =
														ev.target.value.trim() !==
														previewsValue?.name.trim();

													if (!isCategoryUpdated && hasValueChanges) {
														setUpdatedCategories(
															(prev) => new Set(prev.add(category.id)),
														);
													}

													if (isCategoryUpdated && !hasValueChanges) {
														setUpdatedCategories((prev) => {
															prev.delete(category.id);
															return new Set(prev);
														});
													}
												}}
												className="group-hover:!bg-muted/50 transition py-2 px-4 w-full outline-none"
												placeholder="Nome da Categoria"
												type="text"
												required
												ref={(elem) => {
													if (i === 0 && elem) elem.focus();
												}}
											/>
											{updatedCategories.has(category.id) && (
												<Button type="submit">Salvar</Button>
											)}
										</form>
									</TableCell>
									<TableCell>
										<DeleteCategory
											index={i}
											id={category.id}
											handleCategories={setCategories}
										/>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		);
	}

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Categorias</h1>
			</div>
			<div
				className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
				x-chunk="dashboard-02-chunk-1"
			>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="text-2xl font-bold tracking-tight">
						Você Não possui nenhuma categoria
					</h3>
					<p className="text-sm text-muted-foreground">
						Você pode começar a usar o sistema criando uma categoria.
					</p>
					<Button className="mt-4" onClick={createCategory}>
						Criar Categoria
					</Button>
				</div>
			</div>
		</>
	);
};
