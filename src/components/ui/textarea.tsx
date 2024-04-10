import * as React from "react";

import { cn } from "@/utils/cn";

export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	variant?: "default" | "secondary";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, variant = "default", ...props }, ref) => {
		return (
			<textarea
				className={cn(
					"flex min-h-[80px] bg-transparent w-full rounded-xl border border-input px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
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
Textarea.displayName = "Textarea";

export { Textarea };
