import { getCategories } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
 
import { TableForm } from "./components/table-form";

export default async function Page() {
	const supabase = createClient();
	const categories = await getCategories(supabase, { skip: 0, take: 10 });

	return <TableForm categories={categories} />;
}
