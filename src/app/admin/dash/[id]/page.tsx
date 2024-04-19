import { type Product, getCategories, getProduct } from "@/services/queries";
import { createClient } from "@/services/supabase/server";

import { notFound } from "next/navigation";
import { Form } from "./components/form";

export const revalidate = 0;

export default async function Page({ params }: { params: { id: string } }) {
	const supabase = createClient();
	const categories = await getCategories(supabase, { skip: 0, take: 10 });
	const product =
		params.id === "create" ? null : await getProduct(supabase, params.id);

	if (params.id !== "create" && !product) notFound();

	return (
		<Form
			product={product as unknown as Product<string>}
			categories={categories || []}
		/>
	);
}
