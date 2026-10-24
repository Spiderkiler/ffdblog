const CATEGORY_SLUGS: Record<string, string> = {
	技术: "tech",
	生活: "life",
};

export function toSlug(name: string): string {
	return name
		.trim()
		.toLowerCase()
		.replace(/[^\p{L}\p{N}]+/gu, "-")
		.replace(/^-+|-+$/g, "");
}

export function tagSlug(tag: string): string {
	return toSlug(tag);
}

export function categorySlug(category: string): string {
	return CATEGORY_SLUGS[category.trim()] ?? toSlug(category);
}

export function decodeSlugParam(param: string | undefined): string {
	if (!param) return "";
	try {
		return decodeURIComponent(param);
	} catch {
		return param;
	}
}
