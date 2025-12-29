
export const RS: { [key: string]: string | undefined } = new Proxy({}, {
    get(_target: any, p: string): any {
        return window.forguncyWebBrowserBridge.RS[p];
    },
});