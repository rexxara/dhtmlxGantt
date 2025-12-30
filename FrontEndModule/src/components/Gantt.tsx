import { useEffect, useRef } from "react";
// @ts-ignore - dhtmlx-gantt 类型定义
import { gantt } from "dhtmlx-gantt";
import "../dhtmlxgantt.css";

interface IProps {
    configCode?: string; // 配置代码字符串
}

export default function Gantt(props: IProps) {
    const ganttContainerRef = useRef<HTMLDivElement>(null);
    const ganttInitializedRef = useRef<boolean>(false);

    useEffect(() => {
        if (!ganttContainerRef.current) {
            return;
        }

        const setDefaultTaskBackground = () => {
            try {
                const accent1Color = Forguncy.ConvertToCssColor("Accent 1");
                if (accent1Color && ganttContainerRef.current) {
                    ganttContainerRef.current.style.setProperty('--dhx-gantt-task-background', accent1Color);
                }
            } catch (e) {
                console.warn("Failed to set default task background color:", e);
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

    }, [props.configCode]);

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
