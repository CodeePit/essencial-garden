import { notFound } from "next/navigation";
import ProductDetailsCard from "./components/product-details-card";
import StockCard from "./components/stock-card";
import ProductCategoryCard from "./components/product-category-card";
import ArchiveProductCard from "./components/archive-product-card";
import ProductImagesCard from "./components/product-images-card";
import ProductStatusCard from "./components/product-status-card";
import { Button } from "@/components/admin/ui/button";
import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/admin/ui/badge";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
	const product = params.id === "create" ? null : null;

	if (params.id !== "create" && !product) notFound();

	return (
		<>
			<div className="mx-auto grid max-w-screen-lg flex-1 auto-rows-max gap-4">
				<div className="flex items-center gap-4">
					<Button variant="outline" size="icon" className="h-7 w-7">
						<Link href="/admin/dash">
							<ChevronLeft className="h-4 w-4" />
							<span className="sr-only">Back</span>
						</Link>
					</Button>
					<h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
						Pro Controller
					</h1>
					<Badge variant="outline" className="ml-auto sm:ml-0">
						In stock
					</Badge>
					<div className="hidden items-center gap-2 md:ml-auto md:flex">
						<Button variant="outline" size="sm">
							Discard
						</Button>
						<Button size="sm">Save Product</Button>
					</div>
				</div>
				<div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
					<div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
						<ProductDetailsCard />
						{/* <StockCard /> */}
						<ProductCategoryCard />
					</div>
					<div className="grid auto-rows-max items-start gap-4 lg:gap-8">
						<ProductStatusCard />
						<ProductImagesCard />
            {product && <ArchiveProductCard />}
					</div>
				</div>
				<div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
						Discard
					</Button>
					<Button size="sm">Save Product</Button>
				</div>
			</div>
		</>
	);
}
