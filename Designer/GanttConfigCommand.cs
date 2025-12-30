using dhtmlxGantt.Properties;
using GrapeCity.Forguncy.CellTypes;
using GrapeCity.Forguncy.Commands;
using GrapeCity.Forguncy.Plugin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Resources;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace dhtmlxGantt.Designer
{
    public class GanttConfigCommand : ICommand
    {
        private IBuilderContext _builderContext;
        private string _name;
        private static IWebBrowser _webBrowser;

        public IEditorSettingsDataContext editorSettingsDataContext;

        public GanttConfigCommand()
        {
        }

        public GanttConfigCommand(IBuilderContext builderContext)
        {
            _builderContext = builderContext;
        }
        public bool CanExecute(object parameter)
        {
            return true;
        }

        private string GetWebviewUrl()
        {
            if (_builderContext == null)
            {
                throw new InvalidOperationException("BuilderContext must be initialized.");
            }

            var isDebug = _builderContext.GetCustomConfigValue<bool>("debug");

            if (isDebug)
            {
                return _builderContext.StartDevelopmentWebServer("GanttConfigurator", "plugin-dev");
            }

            var folder = _builderContext.GetCustomConfigValue<string>("dist");
            return _builderContext.GenerateStaticFileUrl($@"{folder}\index.html?pluginName=dhtmlxGantt");
        }

        public void Execute(object parameter)
        {
            IEditorSettingsDataContext dataContext = parameter as IEditorSettingsDataContext;
            if (this.editorSettingsDataContext != null)
            {
                dataContext = this.editorSettingsDataContext;
            }
            
            // 确保 dataContext 不为 null
            if (dataContext == null)
            {
                return;
            }
            
            if (_webBrowser == null)
            {
                _webBrowser = GetWebview();
            }

            HostObject hostObject = new HostObject(_webBrowser, _builderContext, dataContext, _name);

            _webBrowser.AddHostObjectToScript(nameof(HostObject), hostObject);
            
            var currentValue = dataContext.Value?.ToString() ?? "";
            
            _webBrowser.EvaluateFunctionAsync("window.dhtmlxGanttBridge.windowReopen");
            _webBrowser.EvaluateFunctionAsync("window.dhtmlxGanttBridge.setValue", currentValue);
            
            var param = new DialogWindowArgs()
            {
                Margin = new Thickness(14, 10, 14, 10),
                ShowOkButton = true,
                ShowCancelButton = true,
                WindowState = WindowState.Normal,
                ShowMaximizeButton = true,
                ResizeMode = ResizeMode.CanResizeWithGrip,
                Width = 1000,
                Height = 720,
                IgnoreEscapeKey = false,
                DonotDisposeWhenClosed = true,
                ClosingAsync = async args =>
                {
                    if (args.ClosedBy == DialogClosedBy.Ok)
                    {
                        await _webBrowser.EvaluateFunctionAsync("window.dhtmlxGanttBridge.beforeClose");
                        dataContext.Value =
                            await _webBrowser.EvaluateFunctionAsync("window.dhtmlxGanttBridge.getSerializedData");
                    }
                    return true;
                }
            };
            _webBrowser.ShowInDialogWindow(param);
        }

        private IWebBrowser GetWebview()
        {
            if (_builderContext == null)
            {
                throw new InvalidOperationException("BuilderContext must be initialized.");
            }

            IWebBrowser webview2 = _builderContext.GetWebBrowser(Resources.GanttConfig, GetWebviewUrl());
            webview2.AddResourceObjectToScript("RS", typeof(Resources));
            return webview2;
        }

        public event EventHandler CanExecuteChanged;
    }

    [ComVisible(true)]
    public class HostObject
    {
        private readonly IWebBrowser _webBrowser;
        private IBuilderContext _builderContext;
        private readonly IEditorSettingsDataContext _dataContext;
        private readonly string _name;

        public HostObject(IWebBrowser webBrowser, IBuilderContext builderContext, IEditorSettingsDataContext dataContext, string name)
        {
            _webBrowser = webBrowser;
            _builderContext = builderContext;
            _dataContext = dataContext;
            _name = name;
        }

        public string GetAllListviewInPage()
        {
            if (_builderContext == null)
            {
                return "[]";
            }
            var listViewInfo = _builderContext.EnumAllListViewInfos(_builderContext.PageName).ToList();
            return JsonSerializer.Serialize(listViewInfo);
        }
        public string GetParamValue()
        {
            // 确保返回值不为 null，如果 Value 为 null 则返回空字符串
            return _dataContext?.Value?.ToString() ?? "";
        }
        public string GetLanguage()
        {
            return Resources.Lang;
        }
        public void Save(string data)
        {
            _dataContext.Value = data;
        }
        // 以下方法是从其他项目复制过来的，暂时返回默认值
        public string GetDataSources()
        {
            return "[]";
        }
        public bool IsCommand()
        {
            return false;
        }
        public string GetAccent1Color()
        {
            if (_builderContext == null)
            {
                return "";
            }
            var themeColors = _builderContext.ThemeColors;
            if (themeColors != null && themeColors.ContainsKey("Accent1"))
            {
                var color = themeColors["Accent1"];
                if (!string.IsNullOrEmpty(color) && color.StartsWith("#") && color.Length == 9)
                {
                    return "#" + color.Substring(3);
                }
                return "";
            }
            return "";
        }
    }
}
