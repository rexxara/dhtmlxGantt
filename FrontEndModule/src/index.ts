import packageJson from '../package.json';
import DhtmlxGanttCellType from './DhtmlxGanttCellType';
Forguncy.Plugin.CellTypeHelper.registerCellType(
  'dhtmlxGantt.DhtmlxGanttCellType, dhtmlxGantt',
  DhtmlxGanttCellType,
);
Forguncy.Plugin.Modular.ready(packageJson.guid);