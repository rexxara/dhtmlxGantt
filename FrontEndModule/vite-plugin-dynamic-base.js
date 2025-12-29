/**
 * Vite 插件：动态基础路径
 * 在 IIFE 模式下运行时动态计算资源路径
 */
export function dynamicBasePlugin() {
  return {
    name: 'dynamic-base',
    generateBundle(options, bundle) {
      // 只在 IIFE 格式下处理
      if (options.format !== 'iife') return;

      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          // 在代码开头注入动态基础路径函数
          const helperCode = `
function FGC__getAssetUrl(path) {
  if (typeof document !== 'undefined') {
  if(Forguncy?.StaticData?.IsDesignerPreview){
  return path;
  }
    var currentScript = document.currentScript;
    if (currentScript && currentScript.src) {
      var scriptUrl = new URL(currentScript.src);
      var basePath = scriptUrl.pathname.substring(0, scriptUrl.pathname.lastIndexOf('/') + 1);
      var res = scriptUrl.origin + basePath +"Resources/frontendModuleDist/"+ path;
      return res;
    }
  }
  return path;
}
`;

          // 替换所有的 assets/ 路径为函数调用
          chunk.code = chunk.code.replace(
            /(['"`])(assets\/[^'"`]+)(['"`])/g,
            (match, quote1, assetPath, quote2) => {
              return `FGC__getAssetUrl(${quote1}${assetPath}${quote2})`;
            }
          );

          // 在代码开头添加助手函数
          chunk.code = helperCode + chunk.code;
        }
      }
    }
  };
}
