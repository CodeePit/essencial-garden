import { Button } from "@/components/admin/ui/button";
import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";

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

export default function Page() {
	const products: string[] = ['', ''];

	if (products?.length) {
    return (
      <Card>
        <CardHeader>
            <CardTitle>Produtos</CardTitle>
            <CardDescription>
              Gerencie seus produtos.
            </CardDescription>
          <Button className="mt-4 w-fit self-end" asChild>
            <Link href="dash/create">Criar Produto</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table className="overflow-x-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Imagem</span>
                </TableHead>
                <TableHead>Nome</TableHead>
                <TableHead className="2xs:table-cell hidden">Categoria</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden xl:table-cell">Criado em</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(() => (
                <TableRow>
                  <TableCell className="hidden max-w-0 sm:table-cell">
                    <Image
                      alt="Imagem do Produto"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src="/placeholder.svg"
                      width="64"
                    />
                  </TableCell>
                  <TableCell title="" className="truncate max-w-0 font-medium">
                    Laser Lemonade Machine
                  </TableCell>
                  <TableCell className="font-medium max-w-0 2xs:table-cell hidden">
                    Laser
                  </TableCell>
                  <TableCell className="max-w-0">
                    <Badge variant="outline">Draft</Badge>
                  </TableCell>
                  <TableCell className="hidden max-w-0 xl:table-cell">
                    <time>2023-07-12 10:42 AM</time>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild><Link href={`/admin/dash/${1}`}>Edit</Link></DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>1-10</strong> of <strong>32</strong> products
          </div>
        </CardFooter>
      </Card>
    );
  }
  
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
