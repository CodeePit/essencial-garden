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
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/utils/cn";
import { CircleUser, Menu, Package, Package2, Search, Tag } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { signOut } from "../actions";

export default function Layout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const headersList = headers();
	const pathname = headersList.get("x-url-pathname");

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex h-full max-h-screen flex-col gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link
							href="/admin/dash"
							className="flex items-center gap-2 font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="">DevStyle Dash</span>
						</Link>
					</div>
					<div className="flex-1">
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
										"text-primary bg-muted":
											pathname === "/admin/dash/categories",
									},
								)}
							>
								<Tag className="h-4 w-4" />
								Categorias
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<SheetClose asChild>
									<Link
										href="/admin/dash"
										className="flex items-center gap-2 text-lg font-semibold"
									>
										<Package2 className="h-6 w-6" />
										<span>DevStyle Dash</span>
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link
										href="/admin/dash"
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Package className="h-5 w-5" />
										Products
									</Link>
								</SheetClose>
								<SheetClose asChild>
									<Link
										href="/admin/dash/categories"
										className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
									>
										<Tag className="h-5 w-5" />
										Categorias
									</Link>
								</SheetClose>
							</nav>
						</SheetContent>
					</Sheet>
					<div className="w-full flex-1">
						<form>
							<div className="relative">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search products..."
									className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
								/>
							</div>
						</form>
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<form action={signOut}>
								<DropdownMenuItem asChild className="w-full">
									<button type="submit">Logout</button>
								</DropdownMenuItem>
							</form>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 overflow-y-auto">
					{children}
				</main>
			</div>
		</div>
	);
}
