"use client";

import {
	type ColumnDef,
	type PaginationState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
	MoreHorizontal,
} from "lucide-react";
import * as React from "react";

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
import { Badge } from "@/components/admin/ui/badge";
import { Button } from "@/components/admin/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/admin/ui/dropdown-menu";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/admin/ui/table";
import { useToast } from "@/components/ui/use-toast";
import type { Product } from "@/services/queries";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteProduct } from "../actions";

export const columns: ColumnDef<Product>[] = [
	{
		id: "image",
		header: () => <span className="sr-only">Imagem</span>,
		meta: {
			className: "hidden w-[100px] sm:table-cell",
			cellClassName: "hidden max-w-0 sm:table-cell",
		},
		cell: (props) => {
			return (
				<Image
					alt="Imagem do Produto"
					className="aspect-square rounded-md object-cover"
					height="260"
					src={props.row.original.images[0]}
					width="260"
				/>
			);
		},
	},
	{
		id: "name",
		header: "Nome",
		accessorKey: "name",
		meta: {
			cellClassName: "truncate max-w-0 font-medium",
			title: "name",
		},
	},
	{
		id: "category",
		header: "Categoria",
		accessorKey: "categories.name",
		meta: {
			className: "2xs:table-cell hidden",
			cellClassName: "font-medium max-w-0 2xs:table-cell hidden",
		},
		cell: (props) => {
			return props.row.original.category.name;
		},
	},
	{
		id: "status",
		header: "Status",
		accessorKey: "status",
		meta: {
			cellClassName: "max-w-0",
		},
		cell: (props) => {
			return <Badge variant="outline">{props.row.original.status}</Badge>;
		},
	},
	{
		id: "created_at",
		header: "Criado Em",
		accessorKey: "created_at",
		accessorFn: (props) =>
			new Date(props.created_at).toLocaleDateString("pt-BR", {
				year: "numeric",
				month: "long",
				day: "numeric",
				hourCycle: "h24",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				hour12: true,
			}),
		meta: {
			className: "hidden xl:table-cell",
			cellClassName: "hidden max-w-0 xl:table-cell",
		},
		cell: (props) => {
			return (
				<time>
					{new Date(props.row.original.created_at).toLocaleDateString("pt-BR", {
						year: "numeric",
						month: "long",
						day: "numeric",
						hourCycle: "h24",
						hour: "2-digit",
						minute: "2-digit",
						second: "2-digit",
						hour12: true,
					})}
				</time>
			);
		},
	},
	{
		id: "actions",
		enableHiding: false,
		header: () => <span className="sr-only">Ações</span>,
		cell: (props) => {
			const [open, setOpen] = React.useState(false);
			const { toast } = useToast();

			return (
				<AlertDialog open={open} onOpenChange={setOpen}>
					<DropdownMenu modal={false}>
						<DropdownMenuTrigger asChild>
							<Button aria-haspopup="true" size="icon" variant="ghost">
								<MoreHorizontal className="h-4 w-4" />
								<span className="sr-only">Abrir/Fechar menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Ações</DropdownMenuLabel>
							<DropdownMenuItem asChild>
								<Link
									className="cursor-pointer py-3"
									href={`/admin/dash/${props.row.original.id}`}
								>
									Editar
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
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
								Essa ação não pode ser desfeita. Isso excluirá permanentemente
								seu produto.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<form
							action={async () => {
								try {
									await deleteProduct(
										props.row.original.id,
										props.row.original.name,
									);
								} catch (e) {
									toast({
										description: (e as Error).message,
										title: "Ops!",
										variant: "destructive",
									});
								}

								setOpen(false);
							}}
						>
							<div className="p-6 border-t bg-muted">
								<Label>
									Para executar essa ação, digite{" "}
									<strong>Deletar meu produto</strong> abaixo:
								</Label>
								<Input
									aria-label="Texto de Verificação"
									pattern="\s*Deletar meu produto\s*"
									required
									aria-invalid={false}
									autoCapitalize="none"
									autoComplete="off"
									autoCorrect="off"
									spellCheck={false}
									id={`verification-text-${props.row.original.id}`}
									type="text"
									name="verification_text"
								/>
							</div>
							<AlertDialogFooter className="border-t p-6">
								<AlertDialogCancel
									onClick={() => {
										const input = document.getElementById(
											`verification-text-${props.row.original.id}`,
										) as HTMLInputElement;

										if (input) input.value = "";
										setOpen(false);
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
		},
	},
];

export const DataTable = ({ data }: { data: Product[] }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const page = searchParams?.get("page") ?? "1";
	const per_page = searchParams?.get("per_page") ?? "10";
	const search = searchParams?.get("search") ?? "";

	const createQueryString = React.useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value === null) newSearchParams.delete(key);
				else newSearchParams.set(key, String(value));
			}

			return newSearchParams.toString();
		},
		[searchParams],
	);

	// handle server-side pagination
	const [{ pageIndex, pageSize }, setPagination] =
		React.useState<PaginationState>({
			pageIndex: Number(page) - 1,
			pageSize: Number(per_page),
		});

	const pagination = React.useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize],
	);

	React.useEffect(() => {
		setPagination({
			pageIndex: Number(page) - 1,
			pageSize: Number(per_page),
		});
	}, [page, per_page]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		router.push(
			`${pathname}?${createQueryString({
				page: pageIndex + 1,
				per_page: pageSize,
			})}`,
		);
	}, [pageIndex, pageSize]);

	const [globalFilter, setGlobalFilter] = React.useState<string>(search);

	const table = useReactTable({
		data,
		columns,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		enableGlobalFilter: true,
		manualFiltering: true,
		state: {
			pagination,
			globalFilter,
		},
	});

	return (
		<div className="w-full">
			<div className="flex items-center w-full justify-between py-4">
				<Input
					placeholder="Filter products..."
					defaultValue={search}
					onChange={(event) => {
						table.setGlobalFilter(event.target.value);
						const value = event.target.value.trim();
						const current = new URLSearchParams(
							Array.from(searchParams.entries()),
						);

						if (!value) current.delete("search");
						else current.set("search", event.target.value);

						const search = current.toString();
						const query = search ? `?${search}` : "";
						router.replace(`${pathname}${query}`);
					}}
					className="max-w-sm"
				/>
				<Button className="w-fit self-end" asChild>
					<Link href="dash/create">Criar Produto</Link>
				</Button>
			</div>
			<div>
				<Table className="overflow-x-auto">
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead
											className={
												(header.column.columnDef.meta as { className: string })
													?.className
											}
											key={header.id}
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && "selected"}
								>
									{row.getVisibleCells().map((cell) => {
										const titleKey = (
											cell.column.columnDef.meta as {
												cellTitle: keyof Product;
											}
										)?.cellTitle;

										return (
											<TableCell
												title={
													titleKey
														? (cell.row.original[titleKey] as string)
														: undefined
												}
												className={
													(
														cell.column.columnDef.meta as {
															cellClassName: string;
														}
													)?.cellClassName
												}
												key={cell.id}
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										);
									})}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={6} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
				<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Pagina {table.getState().pagination.pageIndex + 1} de{" "}
						{table.getPageCount() || 1}
					</div>
					<div className="flex items-center space-x-2">
						<Button
							aria-label="Go to first page"
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}
						>
							<ChevronsLeft className="h-4 w-4" aria-hidden="true" />
						</Button>
						<Button
							aria-label="Go to previous page"
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}
						>
							<ChevronLeft className="h-4 w-4" aria-hidden="true" />
						</Button>
						<Button
							aria-label="Go to next page"
							variant="outline"
							className="h-8 w-8 p-0"
							onClick={() => table.nextPage()}
							disabled={!table.getCanNextPage()}
						>
							<ChevronRight className="h-4 w-4" aria-hidden="true" />
						</Button>
						<Button
							aria-label="Go to last page"
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}
						>
							<ChevronsRight className="h-4 w-4" aria-hidden="true" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
