export const ROUTE_HOME = "/apps/polynguo";

// This is only for dev. Remove this in production
// export const ROUTE_HOME = "/web-app-assets/polynguo";

// export const ROUTE_WORDS_BY_CATEGORY = "/words-by-category";
// export const ROUTE_WORDS_BY_CATEGORY_TITLE = "/words-by-category/:title";

export const ROUTE_WORDS_CATEGORY = ROUTE_HOME + "/:category";
export const ROUTE_WORDS_CATEGORY_TITLE = ROUTE_WORDS_CATEGORY + "/:title/*";
