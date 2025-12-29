using GrapeCity.Forguncy.CellTypes;
using GrapeCity.Forguncy.Plugin;
using System;
using System.ComponentModel;

namespace dhtmlxGantt
{
    [Icon("pack://application:,,,/dhtmlxGantt;component/Resources/Icon.png")]
    [Designer("dhtmlxGantt.Designer.dhtmlxGanttCellTypeDesigner, dhtmlxGantt")]
    public class DhtmlxGanttCellType : CellType
    {
        public string DhtmlxGanttConfig { get; set; }

        public override string ToString()
        {
            return "dhtmlx甘特图单元格";
        }
    }
}
