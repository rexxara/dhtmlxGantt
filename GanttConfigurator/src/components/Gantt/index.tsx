import { useEffect, useRef } from "react";
import { gantt } from "dhtmlx-gantt";
import "../../dhtmlxgantt.css";

interface IProps {
    configCode?: string; // 代码编辑器中的代码字符串
    accent1Color?: string; // 主题颜色 Accent 1
}

export default function Gantt(props: IProps) {
    const ganttContainerRef = useRef<HTMLDivElement>(null);
    const ganttInitializedRef = useRef<boolean>(false);

    useEffect(() => {
        if (!ganttContainerRef.current) {
            return;
        }

        const setDefaultTaskBackground = () => {
            if (props.accent1Color && props.accent1Color.trim() && ganttContainerRef.current) {
                ganttContainerRef.current.style.setProperty('--dhx-gantt-task-background', props.accent1Color);
            }
        };
        setDefaultTaskBackground();

        if (!ganttInitializedRef.current) {
            gantt.init(ganttContainerRef.current);
            ganttInitializedRef.current = true;
        }

        if (props.configCode && props.configCode.trim()) {
            try {
                gantt.clearAll();
                const executeConfig = new Function('gantt', props.configCode);
                executeConfig(gantt);
            } catch (e) {
                console.warn("Failed to execute Gantt config code:", e);
            }
        } else {
            gantt.clearAll();
        }

    }, [props.configCode, props.accent1Color]);

    return (
        <div 
            ref={ganttContainerRef} 
            style={{ 
                width: "100%", 
                height: "100%",
                position: "relative"
            }} 
        />
    );
}
