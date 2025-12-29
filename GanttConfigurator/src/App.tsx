import { useEffect } from 'react'
import './App.css'
import { useAtom } from 'jotai';
import { CommandParamsAtom, DataSourcesAtom, InitdAtom, InitValueAtom, IsCommandAtom, LangAtom, ListviewInfoAtom } from './Context';
import { ListViewInfo } from './Model';
import PlayGround from './components/PlayGround';
function App() {
  const [_initValue, setInitValue] = useAtom(InitValueAtom);
  const [initd, setInitd] = useAtom(InitdAtom);
  const [_lang, setLang] = useAtom(LangAtom);
  const [_DataSources, setDataSources] = useAtom(DataSourcesAtom);
  const [_ListviewInfo, setListviewInfo] = useAtom(ListviewInfoAtom);
  const [_isCommand, setIsCommand] = useAtom(IsCommandAtom);
  const [_commandParams, setCommandParams] = useAtom(CommandParamsAtom);
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
    
    const commandParamPromise = window?.forguncyWebBrowserBridge?.hostObjects['HostObject']?.GetCommandParams().then(commandParamString => {
      setCommandParams(JSON.parse(commandParamString))
    }).catch(() => {
      setCommandParams([]);
    });
    
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

    
    await Promise.all([isCommandPromise, cellInfoPromise, langPromise, listViewPromise, commandParamPromise, valuePromise]);
    setInitValue(initValue ?? '');
    setInitd(true);
  }
  return <PlayGround initd={initd} />
}

export default App
