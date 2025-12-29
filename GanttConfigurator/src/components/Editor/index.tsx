import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import MonacoEditor, { Monaco } from '@monaco-editor/react';
import { useAtom } from "jotai";
import { EditorNoDataAtom, InitdAtom, IsCommandAtom } from "../../Context";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { RS } from "../../i18n";
import EditorInit from "./editorInit";
interface IProps {
    width: number;
    initd: boolean;
}
export interface EditorRef {
    getRef: () => { monacoRef: any, editorRef: any }
}
function Editor(props: IProps, _eRef: React.Ref<unknown>) {
    const editorRef = useRef<any | null>();
    const monacoRef = useRef<any | null>();
    const [isCommand] = useAtom(IsCommandAtom);
    const [editorInitd, setEditorInitd] = useState(false);
    const [_, setInitd] = useAtom(InitdAtom);

    const [noData, setNoData] = useAtom(EditorNoDataAtom);
    useImperativeHandle(_eRef, () => {
        const res: EditorRef = {
            getRef: () => {
                return {
                    monacoRef: monacoRef.current,
                    editorRef: editorRef.current
                }
            }
        }
        return res;
    });
    useEffect(() => {
        window.dhtmlxGanttBridge = {
            beforeClose: () => {
                return true;
            },
            hasUnsavedChanges: () => {
                return false;
            },
            getSerializedData: () => {
                return editorRef.current?.getValue();
            },
            windowReopen: () => {
                setInitd(false);
            },
            setValue: (value: string) => {
                if (editorRef.current) {
                    editorRef.current.focus();
                    editorRef.current.setValue(value);
                }
            },
            editorReady: () => {
                return !!monacoRef.current;
            }
        }
    }, []);
    return <div className="FGC_gantt-configurator-editor-con">
        {noData && <div style={{ width: (props.width - 30) + 'px' }} onClick={() => {
            editorRef.current.focus();
        }} className="FGC_gantt-configurator-editor-no-data">{
                isCommand ? RS.AiCommandNoDataPlaceholder : RS.AiCellNoDataPlaceholder
            }</div>}
        {(props.initd && editorInitd) ? <EditorInit getRefs={() => ({ editorRef, monacoRef })} /> : <></>}
        <MonacoEditor
            width={props.width}
            loading={<div className="FGC_gantt-configurator-editor-loading"><Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} /></div>}
            language="gantt-configurator"
            theme="gantt-configurator-theme"
            className="FGC_gantt-configurator-editor"
            beforeMount={(monaco) => {
                initHighlight(monaco);
            }}
            options={{
                scrollbar: {
                    verticalScrollbarSize: 6,
                    verticalSliderSize: 6,
                    horizontalScrollbarSize: 6,
                    horizontalSliderSize: 6,
                    horizontal: "auto"
                },
                tabSize: 4,
                minimap: {
                    enabled: false
                },
                glyphMargin: false,
                lineDecorationsWidth: 0,
                lineNumbersMinChars: 2,
                overviewRulerBorder: false,
                fontSize: 16,
            }}
            onChange={(nextValue) => {
                if ((nextValue ?? '').length === 0) {
                    setNoData(true);
                } else {
                    setNoData(false);
                }
            }}
            onMount={(editor, monaco) => {
                editorRef.current = editor;
                monacoRef.current = monaco;
                setEditorInitd(true);
            }}
        />
    </div>
}
export default forwardRef(Editor)
function initHighlight(monaco: Monaco) {
    monaco.languages.register({ id: 'gantt-configurator' });
    monaco.languages.setMonarchTokensProvider('gantt-configurator', {
        defaultToken: '',
        tokenizer: {
            root: [
                [/\[=([^\]]+)\]/, 'variable-name'],
                [/\[%([^\]]+)%\]/, 'keyword-name']
            ]
        }
    });

    // 添加语言配置，支持自动闭合括号
    monaco.languages.setLanguageConfiguration('gantt-configurator', {
        brackets: [
            ['[', ']']
        ],
        autoClosingPairs: [
            { open: '[', close: ']' }
        ],
        surroundingPairs: [
            { open: '[', close: ']' }
        ]
    });

    monaco.editor.defineTheme('gantt-configurator-theme', {
        base: 'vs',
        inherit: true,
        rules: [
            { token: 'variable-name', foreground: '#0066cc' },
            { token: 'keyword-name', foreground: '#9B59B6' }
        ],
        colors: {
        }
    });
}
