import { useEffect } from 'react'
import './App.css'
import { useAtom } from 'jotai';
import { Accent1ColorAtom, DataSourcesAtom, InitdAtom, InitValueAtom, IsCommandAtom, LangAtom, ListviewInfoAtom } from './Context';
import { ListViewInfo } from './Model';
import PlayGround from './components/PlayGround';
import { DEFAULT_GANTT_CONFIG } from './Utils/defaultGanttConfig';
function App() {
  const [_initValue, setInitValue] = useAtom(InitValueAtom);
  const [initd, setInitd] = useAtom(InitdAtom);
  const [_lang, setLang] = useAtom(LangAtom);
  const [_DataSources, setDataSources] = useAtom(DataSourcesAtom);
  const [_ListviewInfo, setListviewInfo] = useAtom(ListviewInfoAtom);
  const [_isCommand, setIsCommand] = useAtom(IsCommandAtom);
  const [_accent1Color, setAccent1Color] = useAtom(Accent1ColorAtom);
  useEffect(() => {
    if (!initd) {
      window?.forguncyWebBrowserBridge?.ready();
      init();
    }
  }, [initd]);
  const init = async () => {
    const cellInfoPromise = Promise.resolve().then(() => {
      setDataSources([]);
    });
    
    let initValue = '';
    
    const isCommandPromise = Promise.resolve().then(() => {
      setIsCommand(false);
    });

    const valuePromise = window?.forguncyWebBrowserBridge?.hostObjects['HostObject']?.GetParamValue().then(data => {
      initValue = data;
    }).catch(() => {
      initValue = '';
    });
    
    const langPromise = window?.forguncyWebBrowserBridge?.hostObjects['HostObject']?.GetLanguage().then(data => {
      setLang(data);
    }).catch(() => {
      setLang('en');
    });
    
    const listViewPromise = window?.forguncyWebBrowserBridge?.hostObjects['HostObject']?.GetAllListviewInPage().then(data => {
      const listviewInfo: ListViewInfo[] = JSON.parse(data);
      setListviewInfo(listviewInfo);
    }).catch(() => {
      setListviewInfo([]);
    });

    const accent1ColorPromise = window?.forguncyWebBrowserBridge?.hostObjects['HostObject']?.GetAccent1Color().then((data: string) => {
      setAccent1Color(data || '');
    }).catch(() => {
      setAccent1Color('');
    });

    
    await Promise.all([isCommandPromise, cellInfoPromise, langPromise, listViewPromise, valuePromise, accent1ColorPromise]);
    
    // 如果没有值，设置默认值
    if (!initValue || initValue.trim() === '') {
      initValue = DEFAULT_GANTT_CONFIG;
    }
    
    setInitValue(initValue ?? '');
    setInitd(true);
  }
  return <PlayGround initd={initd} />
}

export default App
