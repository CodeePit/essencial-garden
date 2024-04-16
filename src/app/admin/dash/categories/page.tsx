import { getCategories } from "@/services/queries";
import { createClient } from "@/services/supabase/server";
import { cookies } from "next/headers";
import { TableForm } from "./components/table-form";

export default async function Page() {
	const cookiesStore = cookies();
	const supabase = createClient(cookiesStore);
	const categories = await getCategories(supabase, { skip: 0, take: 10 });

	return <TableForm categories={categories} />;
}
