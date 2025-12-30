import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import Editor, { EditorRef } from "../Editor";
import Gantt from "../Gantt";
import { CodeOutlined, EyeOutlined } from "@ant-design/icons";
import { Accent1ColorAtom } from "../../Context";
import "./index.css";

interface IProps {
    initd: boolean;
}

export default function PlayGround(props: IProps) {
    const editorRef = useRef<EditorRef>(null);
    const [editorValue, setEditorValue] = useState<string>("");
    const [showEditor, setShowEditor] = useState<boolean>(true);
    const [showGantt, setShowGantt] = useState<boolean>(true);
    const editorValueUpdateIntervalRef = useRef<any>(null);
    const [accent1Color] = useAtom(Accent1ColorAtom);

    const startEditorValueWatcher = () => {
        if (editorValueUpdateIntervalRef.current) {
            clearInterval(editorValueUpdateIntervalRef.current);
        }
        
        editorValueUpdateIntervalRef.current = setInterval(() => {
            if (editorRef.current) {
                const currentValue = editorRef.current.getValue() || "";
                if (currentValue !== editorValue) {
                    setEditorValue(currentValue);
                }
            }
        }, 500);
    };

    useEffect(() => {
        if (props.initd) {
            startEditorValueWatcher();
        }
        
        return () => {
            if (editorValueUpdateIntervalRef.current) {
                clearInterval(editorValueUpdateIntervalRef.current);
                editorValueUpdateIntervalRef.current = null;
            }
        };
    }, [props.initd]);

    const getPanelWidth = () => {
        if (showEditor && showGantt) {
            return "50%";
        } else if (showEditor || showGantt) {
            return "100%";
        }
        return "0%";
    };

    return (
        <div 
            className="gantt-configurator-container"
            style={accent1Color ? { '--accent-color': accent1Color } as React.CSSProperties : undefined}
        >
            <div className="gantt-configurator-main">
                <div 
                    className="gantt-configurator-editor-panel"
                    style={{ 
                        width: getPanelWidth(),
                        display: showEditor ? "flex" : "none"
                    }}
                >
                    <Editor initd={props.initd} width="100%" ref={editorRef} />
                </div>
                <div 
                    className="gantt-configurator-preview-panel"
                    style={{ 
                        width: getPanelWidth(),
                        display: showGantt ? "flex" : "none"
                    }}
                >
                    <Gantt configCode={editorValue} accent1Color={accent1Color} />
                </div>
            </div>
            <div className="gantt-configurator-footer">
                <div 
                    className={`footer-button ${showEditor ? "active" : ""}`}
                    onClick={() => {
                        const newShowEditor = !showEditor;
                        if (!newShowEditor && !showGantt) {
                            return;
                        }
                        setShowEditor(newShowEditor);
                    }}
                    title="代码编辑器"
                >
                    <CodeOutlined />
                    <span className="button-text">代码编辑器</span>
                </div>
                <div 
                    className={`footer-button ${showGantt ? "active" : ""}`}
                    onClick={() => {
                        const newShowGantt = !showGantt;
                        if (!newShowGantt && !showEditor) {
                            return;
                        }
                        setShowGantt(newShowGantt);
                    }}
                    title="Gantt 预览"
                >
                    <EyeOutlined />
                    <span className="button-text">Gantt 预览</span>
                </div>
            </div>
        </div>
    );
}