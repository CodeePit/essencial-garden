import * as React from "react";

import { cn } from "@/utils/cn";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	variant?: "default" | "secondary";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, variant = "default", ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(
					"flex h-10 w-full rounded-full border px-3 py-2 text-sm bg-transparent file:border-0 file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
					{
						"border-primary ring-offset-background placeholder:text-primary/50 focus-visible:ring-primary":
							variant === "default",
						"border-background ring-offset-primary placeholder:text-background/50 focus-visible:ring-background":
							variant === "secondary",
					},
					className,
				)}
				ref={ref}
				{...props}
			/>
		);
	},
);
Input.displayName = "Input";

export { Input };
