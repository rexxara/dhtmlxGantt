import { loader } from '@monaco-editor/react';

export function initEditorLang() {
    const lang = window.forguncyWebBrowserBridge.RS.Lang || 'en';
    const monacoEditorLangMap: { [key: string]: string; } = {
        en: '',
        cn: 'zh-cn',
        ja: 'ja',
        kr: 'ko',
    };
    loader.config({
        paths: {
            vs: 'public/monacoEditor',
        },
        'vs/nls': { availableLanguages: { '*': monacoEditorLangMap[lang] } }
    });
}
