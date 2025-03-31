export const getAssetPath = (path: string): string => {
    // This will automatically handle the base URL in production
    return `${import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL}/assets/${path}`;
}; 