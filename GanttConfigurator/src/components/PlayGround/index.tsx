import { useRef } from "react";
import Editor, { EditorRef } from "../Editor";
interface IProps {
    initd: boolean;
}
export default function PlayGround(props: IProps) {
    const editorRef = useRef<EditorRef>(null);
    return <div className="FGC_ai-prompt-editor-playGround">
        <Editor initd={props.initd} width={window.innerWidth} ref={editorRef} />
    </div>
}