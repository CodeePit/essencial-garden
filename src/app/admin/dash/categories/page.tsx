import { getCategories } from "@/services/queries";
import { TableForm } from "./components/table-form";
import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";

export default async function Page() {
	const cookiesStore = cookies();
	const supabase = createClient(cookiesStore);
	const categories = await getCategories(supabase, { skip: 0, take: 10 });

	return <TableForm categories={categories} />;
}
