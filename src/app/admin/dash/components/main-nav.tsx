"use client";

import { cn } from "@/utils/cn";
import { Package, Tag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MainNav = () => {
	const pathname = usePathname();

	return (
		<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
			<Link
				href="/admin/dash"
				className={cn(
					"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
					{
						"text-primary bg-muted": pathname === "/admin/dash",
					},
				)}
			>
				<Package className="h-4 w-4" />
				Produtos{" "}
			</Link>
			<Link
				href="/admin/dash/categories"
				className={cn(
					"flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
					{
						"text-primary bg-muted": pathname === "/admin/dash/categories",
					},
				)}
			>
				<Tag className="h-4 w-4" />
				Categorias
			</Link>
		</nav>
	);
};
