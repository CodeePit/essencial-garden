import { Button } from "@/components/admin/ui/button";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/admin/ui/badge";
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
import { getProducts } from "@/services/queries";
import { createClient } from "@/services/supabase/server";

import { DataTable } from "./components/table-products";

export const revalidate = 0;

interface PageProps {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}

export default async function Page({ searchParams }: PageProps) {
	const { search } = searchParams;

	const limit = 9999;
	const offset = 0;

	const products = await getProducts(createClient(), {
		skip: offset,
		take: limit,
		search: search as string,
	});

	if (!search?.length && !products.length) {
		return (
			<>
				<div className="flex items-center">
					<h1 className="text-lg font-semibold md:text-2xl">Produtos</h1>
				</div>
				<div
					className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
					x-chunk="dashboard-02-chunk-1"
				>
					<div className="flex flex-col items-center gap-1 text-center">
						<h3 className="text-2xl font-bold tracking-tight">
							Você Não possui nenhum produto
						</h3>
						<p className="text-sm text-muted-foreground">
							Você pode começar a usar o sistema adicionando um produto.
						</p>
						<Button className="mt-4" asChild>
							<Link href="dash/create">Criar Produto</Link>
						</Button>
					</div>
				</div>
			</>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Produtos</CardTitle>
				<CardDescription>Gerencie seus produtos.</CardDescription>
			</CardHeader>
			<CardContent>
				<DataTable data={products} />
			</CardContent>
		</Card>
	);
}
