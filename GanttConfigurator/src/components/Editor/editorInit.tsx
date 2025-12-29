import { Monaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { EditorNoDataAtom, InitdAtom, InitValueAtom } from "../../Context";
interface IProps {
    getRefs: () => {
        editorRef: React.MutableRefObject<any>
        monacoRef: React.MutableRefObject<any>
    }
}

const language = 'custom-prompt';
export default function EditorInit(props: IProps) {
    const [initValue] = useAtom(InitValueAtom);
    const [initd] = useAtom(InitdAtom);
    const [_noData, setNoData] = useAtom(EditorNoDataAtom);
    useEffect(() => {
        if (!initd) {
            return;
        }
        const refs = props.getRefs();
        const editor = refs.editorRef.current;
        initHint(refs.monacoRef.current, { keywordList: [], variableList: [] });
        const model = editor.getModel();
        editor.setValue(initValue);
        const lastLine = model.getLineCount();
        const lastColumn = model.getLineMaxColumn(lastLine);
        editor.setPosition({ lineNumber: lastLine, column: lastColumn });
        editor.focus();
        setNoData(!initValue)
    }, [initd])
    return <></>
}

let suggestionsInst: any = undefined;
let variableInst: any = undefined;
function initHint(
    monaco: Monaco,
    hintInfo: { keywordList: { detail: string, insertText: string }[], variableList: { detail: string, insertText: string }[] },
): void {
    suggestionsInst?.dispose();
    suggestionsInst = monaco.languages.registerCompletionItemProvider(language, {
        triggerCharacters: ["%"],
        provideCompletionItems: getProvideCompletionItems(/([^%]*)$/, "keywordList", hintInfo, monaco)
    });
    variableInst?.dispose();
    variableInst = monaco.languages.registerCompletionItemProvider(language, {
        triggerCharacters: ["="],
        provideCompletionItems: getProvideCompletionItems(/([^=]*)$/, "variableList", hintInfo, monaco)
    });
}

function getTextUntilPosition(model: any, position: any) {
    return model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 1,
        endLineNumber: position.lineNumber,
        endColumn: position.column
    });
}

function getProvideCompletionItems(
    matcher: RegExp,
    type: "variableList" | "keywordList",
    hintInfo: { keywordList: { detail: string, insertText: string }[], variableList: { detail: string, insertText: string }[] },
    monaco: Monaco,
) {
    return (model: any, position: any) => {
        const textUntilPosition = getTextUntilPosition(model, position);
        if (textUntilPosition.at(-2) !== "[") {
            return;
        }

        const match = model.getValueInRange({
            startLineNumber: position.lineNumber,
            startColumn: 1,
            endLineNumber: position.lineNumber,
            endColumn: position.column
        }).match(matcher);

        if (!match) {
            return;
        }

        const currentInput = match[1] || '';
        const suggestions = hintInfo[type]
            .filter(variable => variable.insertText.toLowerCase().includes(currentInput.toLowerCase()))
            .map(variable => {
                return {
                    label: variable.insertText,
                    kind: monaco.languages.CompletionItemKind.Variable,
                    insertText: variable.insertText,
                    range: new monaco.Range(
                        position.lineNumber,
                        position.column - currentInput.length - 1, // -1 是为了包含 [=
                        position.lineNumber,
                        position.column
                    ),
                    detail: variable.detail,
                    documentation: variable.insertText
                }
            });
        return { suggestions };
    }
}