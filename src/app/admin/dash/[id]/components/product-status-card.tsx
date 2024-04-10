import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
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
				<CardTitle>Status do product</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="grid gap-6">
					<div className="grid gap-3">
						<Label htmlFor="status">Status</Label>
						<Select>
							<SelectTrigger id="status" aria-label="Select status">
								<SelectValue placeholder="Selecione..." />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="draft">Draft</SelectItem>
								<SelectItem value="published">Active</SelectItem>
								<SelectItem value="archived">Archived</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
