import { atom } from "jotai";
import { DataSource, ListViewInfo } from "../Model";

export const InitValueAtom = atom<string>("");
export const InitdAtom = atom<boolean>(false);
export const LangAtom = atom<'en' | 'cn' | 'ja' | 'ko'>('en');
export const DataSourcesAtom = atom<DataSource[]>([]);
export const ListviewInfoAtom = atom<ListViewInfo[]>([]);
export const IsCommandAtom = atom<boolean>(false);
export const EditorNoDataAtom = atom<boolean>(false);
export const Accent1ColorAtom = atom<string>("");
export const EditorInitdAtom = atom<boolean>(false);
export const EditorValueAtom = atom<string>("");
export const ShowEditorAtom = atom<boolean>(true);
export const ShowGanttAtom = atom<boolean>(true);