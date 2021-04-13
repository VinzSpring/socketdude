export function isValidUrl(url: string): boolean {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

export function isValidWebsocketUrl(url: string): boolean | string {
    const pattern = /^(wss?:\/\/)(([a-z]+\.?)+|([0-9]+\.?)+)([a-zA-Z]+|:[0-9]+)$/;
    return pattern.test(url) || 'invalid url.';
}
