import { atom } from "jotai";
import { DataSource, ListViewInfo } from "../Model";

export const InitValueAtom = atom<string>("");
export const InitdAtom = atom<boolean>(false);
export const LangAtom = atom<'en' | 'cn' | 'ja' | 'ko'>('en');
export const DataSourcesAtom = atom<DataSource[]>([]);
export const ListviewInfoAtom = atom<ListViewInfo[]>([]);
export const IsCommandAtom = atom<boolean>(false);
export const CommandParamsAtom = atom<{ Name: string }[]>([]);
export const EditorNoDataAtom = atom<boolean>(false);

//64 server command
//1 cell or fe command
//128 schedule task