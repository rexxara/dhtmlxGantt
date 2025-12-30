import style from './index.module.css'
import type { DhtmlxGanttCellTypeMetadata } from './DhtmlxGanttCellType'
import Gantt from './components/Gantt'

function DhtmlxGanttCellTypeComponent(props: { cellType: Forguncy.Plugin.CellTypeBase<DhtmlxGanttCellTypeMetadata> }) {
    const configValue = props.cellType.CellElement.CellType.DhtmlxGanttConfig || '';
    return (
        <div className={style.appContainer}>
            <Gantt configCode={configValue} />
        </div>
    )
}

export default DhtmlxGanttCellTypeComponent
