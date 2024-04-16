"use client";
import { Button } from "@/components/admin/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";
import { formatForURL } from "@/utils/format-for-url";
import { URI_ID_INVALID_REGEX } from "@/utils/regex";
import { Dices } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductDetailsCard({
	defaultValue,
}: {
	defaultValue?: {
		uri_id: string;
		name: string;
		description: string;
		keywords: string;
	} | null;
}) {
	const [uriId, setUriId] = useState(defaultValue?.uri_id || "");

	return (
		<Card x-chunk="dashboard-07-chunk-0">
			<CardHeader>
				<CardTitle>Detalhes do Produtos</CardTitle>
				<CardDescription>
					Edite as informações do produto de acordo com suas preferências.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<Label htmlFor="name">Nome*</Label>
						<Input
							id="name"
							name="name"
							type="text"
							className="w-full"
							placeholder="Produto X"
							required
							defaultValue={defaultValue?.name}
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="uri-id">URL do Produto*</Label>
						<div className="flex focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ring rounded">
							<span
								title="https://essencial-garden.vercel.app/produto/"
								className="border max-2xs:hidden whitespace-nowrap max-xl:truncate border-r-transparent p-2 rounded-l bg-accent text-sm text-primary/50 px-4"
							>
								https://essencial-garden.vercel.app/produto/
							</span>
							<Input
								className="rounded-none max-2xs:rounded-l-md border-r-transparent !ring-transparent !ring-0 !ring-offset-0"
								value={uriId}
								id="uri-id"
								name="uri_id"
								placeholder="produto-x"
								required
								maxLength={25}
								onChange={(ev) => {
									setUriId(
										ev.target.value.length <= 25
											? ev.target.value
											: ev.target.value
													.toLowerCase()
													.replaceAll(URI_ID_INVALID_REGEX, ""),
									);
								}}
							/>
							<Button
								type="button"
								onClick={() => {
									setUriId(
										formatForURL(
											(document.getElementById("name") as HTMLInputElement)
												.value,
										),
									);
								}}
								variant="outline"
								className="p-3 rounded-l-none"
							>
								<span className="sr-only">Gerar Caminho</span>
								<Dices size="1rem" />
							</Button>
						</div>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="description">Descrição*</Label>
						<Textarea
							required
							defaultValue={defaultValue?.description}
							id="description"
							name="description"
							placeholder="..."
							className="min-h-32"
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="keywords">Keywords for SEO</Label>
						<Input
							id="keywords"
							name="keywords"
							type="text"
							defaultValue={defaultValue?.keywords}
							className="w-full"
							placeholder="Produto X, Produto para ..."
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
