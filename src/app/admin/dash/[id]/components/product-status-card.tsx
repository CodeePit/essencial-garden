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

export default function ProductStatusCard() {
	return (
		<Card x-chunk="dashboard-07-chunk-3">
			<CardHeader>
				<CardTitle>Status do Produto</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<Label htmlFor="status">Status</Label>
						<Select required name="status" defaultValue="published">
							<SelectTrigger id="status" aria-label="Select status">
								<SelectValue placeholder="Selecione..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="published">
									<div className="flex items-center gap-2">
										<span aria-hidden className="w-2 h-2 rounded-full flex bg-green-400" />
										<span>Ativo</span>
									</div>
								</SelectItem>
								<SelectItem value="archived"><div className="flex items-center gap-2">
										<span aria-hidden className="w-2 h-2 rounded-full flex bg-yellow-400" />
										<span>Arquivado</span>
									</div></SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
