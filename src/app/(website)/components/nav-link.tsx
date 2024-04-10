"use client";
import { cn } from "@/utils/cn";
import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({
	className,
	...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) => {
	const pathname = usePathname();

	return (
		<Link
			className={cn(
				"text-secondary uppercase font-medium leading-5",
				{ "text-primary": pathname === props.href },
				className,
			)}
			{...props}
		/>
	);
};
