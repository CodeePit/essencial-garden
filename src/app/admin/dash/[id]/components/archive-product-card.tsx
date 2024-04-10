import { Card, CardContent } from "@/components/admin/ui/card";
import { Button } from "@/components/admin/ui/button";

export default function ArchiveProductCard() {
  return (
    <Card x-chunk="dashboard-07-chunk-5">
      <CardContent>
        <div />
        <Button size="sm" variant="secondary">
          Archive Product
        </Button>
      </CardContent>
    </Card>
  );
}
