import { createRoot, type Root } from 'react-dom/client';
import DhtmlxGanttCellTypeComponent from './DhtmlxGanttCellTypeComponent';

export interface DhtmlxGanttCellTypeMetadata {
    DhtmlxGanttConfig: string
}

export default class DhtmlxGanttCellType extends Forguncy.Plugin.CellTypeBase<DhtmlxGanttCellTypeMetadata> {
    reactRoot: Root | undefined;
    constructor(...args: unknown[]) {
        super(...args);
    }
    async onPageLoaded() {
    }
    getDefaultValue(): Forguncy.Plugin.ICellTypeDefaultValue {
        // 将 DhtmlxGanttConfig 的值设置为单元格的默认值
        const configValue = this.CellElement.CellType.DhtmlxGanttConfig || '';
        return {
            Value: configValue
        };
    }
    createContent() {
        const div = $('<div style="height:100%"></div>');
        this.reactRoot = createRoot(div[0]);
        this.reactRoot.render(
            <DhtmlxGanttCellTypeComponent cellType={this} />
        );
        return div;
    }
    destroy(): void {
        this.reactRoot?.unmount();
        super.destroy();
    }
}