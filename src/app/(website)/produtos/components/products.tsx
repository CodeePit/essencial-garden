"use client";
import { type Product, getProducts } from "@/services/queries";
import { createClient } from "@/services/supabase";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { ProductCard } from "./product-card";

export const getPagination = (page: number, size: number) => {
	const limit = size ? +size : 3;
	const skip = page ? page * limit : 0;
	const take = page ? skip + size : size;

	return { skip, take };
};

export const Products = ({
	categoriesChecked,
}: {
	categoriesChecked: string[];
}) => {
	const { ref, inView } = useInView();
	const supabase = createClient();
	const [selectedCategories, setSelectedCategories] = React.useState(
		new Set(categoriesChecked),
	);

	const {
		data: products,
		error,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery({
		queryKey: ["products"],
		queryFn: ({ pageParam }: { pageParam: number }) => {
			return getProducts(supabase, {
				...getPagination(pageParam, 10),
				get: "name,images,id,uri_id,description",
				filters:
					selectedCategories.size > 0
						? (ctx) =>
								ctx
									.eq("status", "published")
									.in("category", Array.from(selectedCategories))
						: undefined,
			});
		},
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
			return lastPageParam + 1;
		},
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	return (
		<ul className="w-full flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
			{products?.pages?.map((page) =>
				page.map((product, index) =>
					page.length - 1 === index ? (
						<ProductCard key={product.id} innerRef={ref} product={product} />
					) : (
						<ProductCard key={product.id} product={product} />
					),
				),
			)}
		</ul>
	);
};
