import { Button } from "@/components/admin/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Inventário</h1>
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
  )
}