declare module 'dhtmlx-gantt' {
    export interface GanttConfig {
        date_format?: string;
        [key: string]: any;
    }

    export interface GanttData {
        data?: any[];
        links?: any[];
    }

    export interface Gantt {
        config: GanttConfig;
        init(container: HTMLElement): void;
        parse(data: GanttData): void;
        clearAll(): void;
        [key: string]: any;
    }

    export const gantt: Gantt;
}
