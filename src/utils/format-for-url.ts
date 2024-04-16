import { generateRandomCode } from "./generate-random-code";

export function formatForURL(productName: string, random = true): string {
	const friendlyUrl = productName
		.toLowerCase()
		.replace(/[^a-zA-Z0-9\s]/g, "")
		.replace(/\s+/g, "-");

	const randomCode = random ? generateRandomCode(5) : "";

	return `${
		random && friendlyUrl.length ? `${friendlyUrl}-` : friendlyUrl
	}${randomCode}`;
}
