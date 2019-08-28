/* tslint:disable:no-unused-expression */
function isValidUrl(url: string): boolean {
    try {
        // @ts-ignore
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}


export { isValidUrl };
