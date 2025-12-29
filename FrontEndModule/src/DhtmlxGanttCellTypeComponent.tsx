import style from './index.module.css'
import type { DhtmlxGanttCellTypeMetadata } from './DhtmlxGanttCellType'

function DhtmlxGanttCellTypeComponent(props: { cellType: Forguncy.Plugin.CellTypeBase<DhtmlxGanttCellTypeMetadata> }) {
    const cellTypeMeta = props.cellType.CellElement.CellType;
    const configValue = cellTypeMeta.DhtmlxGanttConfig || '';

    return (
        <div className={style.appContainer}>
            <h2>活字格 + React</h2>
            <h3>dhtmlxGantt</h3>
            <div className="card">
                <p>配置值: {configValue || '(未设置)'}</p>
            </div>
        </div>
    )
}

export default DhtmlxGanttCellTypeComponent
