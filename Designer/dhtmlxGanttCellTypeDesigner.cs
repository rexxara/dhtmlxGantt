using GrapeCity.Forguncy.CellTypes;
using GrapeCity.Forguncy.Plugin;
using System.ComponentModel;
using System.Windows;

namespace dhtmlxGantt.Designer
{
    public class dhtmlxGanttCellTypeDesigner : CellTypeDesigner<DhtmlxGanttCellType>
    {
        public override FrameworkElement GetDrawingControl(ICellInfo cellInfo, IDrawingHelper drawingHelper)
        {
            return drawingHelper.GetHeadlessBrowserPreviewControl(new GetHeadlessBrowserPreviewControlOptions()
            {
                GenerateCustomArgs = () =>
                {
                    return new object[] {  };
                },
            });
        }
        public override EditorSetting GetEditorSetting(PropertyDescriptor property, IBuilderContext builderContext)
        {

            if (property.Name == nameof(DhtmlxGanttCellType.DhtmlxGanttConfig))
            {
                return new HyperlinkEditorSetting(new GanttConfigCommand(builderContext));
            }
            return base.GetEditorSetting(property, builderContext);
        }
    }
}