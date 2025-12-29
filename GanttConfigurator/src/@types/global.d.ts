
interface Window {
    forguncyWebBrowserBridge: {
        RS: { [key: string]: string | undefined }
        hostObjects: {
            HostObject: {
                GetParamValue(): Promise<string>;
                GetCommandParams(): Promise<string>;
                IsCommand(): Promise<boolean>;
                GetParamName(): Promise<string>;
                GetAllListviewInPage(): Promise<string>;
                GetLanguage(): Promise<'en' | 'cn' | 'ja' | 'ko'>;
                GetDataSources: () => Promise<string>;
            };
        };
        ready: () => void;
    };
    dhtmlxGanttBridge: {
        getSerializedData: Function;
        hasUnsavedChanges: Function;
        beforeClose: Function;
        setValue: (value: string) => void;
        windowReopen: () => void;
        editorReady: () => boolean;
    }
}
