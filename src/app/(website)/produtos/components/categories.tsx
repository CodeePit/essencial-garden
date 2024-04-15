"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const Categories = ({
	categories,
	categoriesChecked,
}: {
	categories: Record<"id" | "name", string>[];
	categoriesChecked: string[];
}) => {
	const [selectedCategories, setSelectedCategories] = React.useState(
		new Set(categoriesChecked),
	);

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = React.useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value === null) newSearchParams.delete(key);
				else newSearchParams.set(key, String(value));
			}

			return newSearchParams.toString();
		},
		[searchParams],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		router.push(
			`${pathname}?${
				selectedCategories.size === 0
					? ""
					: createQueryString({
							categorias: Array.from(selectedCategories)
								.join(",")
								.replace(/^,/, ""),
						})
			}`,
			{ scroll: false },
		);
	}, [selectedCategories]);

	return (
		<ul className="flex max-md:flex-wrap md:flex-col mt-4 gap-8 max-md:w-full max-md:justify-center md:gap-2">
			{categories.map((category) => (
				<li key={category.id}>
					<label
						htmlFor={category.id}
						className="text-sm cursor-pointer flex items-center gap-2 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						<Checkbox
							id={category.id}
							name={category.id}
							defaultChecked={selectedCategories.has(category.id)}
							onCheckedChange={(check) =>
								setSelectedCategories((prev) => {
									check ? prev.add(category.id) : prev.delete(category.id);
									return new Set(prev);
								})
							}
						/>
						{category.name}
					</label>
				</li>
			))}
		</ul>
	);
};
