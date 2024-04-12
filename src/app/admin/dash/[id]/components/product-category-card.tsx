import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/admin/ui/card";
import { Label } from "@/components/admin/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/admin/ui/select";

export default function ProductCategoryCard({
	defaultValue,
	categories,
}: { defaultValue?: string; categories: { id: string; name: string }[] }) {
	return (
		<Card x-chunk="dashboard-07-chunk-2">
			<CardHeader>
				<CardTitle>Categoria do Produto</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-3">
					<Label htmlFor="category">Categoria</Label>
					<Select defaultValue={defaultValue} required name="category">
						<SelectTrigger id="category" aria-label="Select category">
							<SelectValue placeholder="Selecione..." />
						</SelectTrigger>
						<SelectContent>
							{categories.map((category) => (
								<SelectItem key={category.id} value={category.id}>
									{category.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</CardContent>
		</Card>
	);
}
