export const PATH_REGEX =
	/^(\/?([a-zA-Z0-9-_()\[\]]+)(\/[a-zA-Z0-9-_()\[\]]+){1,6}\.(webp))$/i;
export const URI_ID_REGEX = /^([a-z0-9-]+)$/g;
export const URI_ID_INVALID_REGEX = /([^a-z0-9-]+)/g;
export const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i