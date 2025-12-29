

export interface DataSource {
    name: string;
    BindingTableOptions: BindingTableOptions;
}
export interface BindingTableOptions {
    TableName: string;
    Columns: Column[];
    QueryCondition: null;
    FormulaNullQueryPolicy: number;
    SortCondition: null;
    BindingColumnDataSourceTreeSetting: null;
    CustomColumns: string[];
    TopCount: null;
    OffsetCount: null;
}

export interface Column {
    GUID: string;
    ColumnName: string;
    BindingInfo: BindingInfo;
    RealBindingInfo: RealBindingInfo;
}

export interface BindingInfo {
    TableName: string;
    ColumnName: string;
    IsByteArray: boolean;
}

export interface RealBindingInfo {
    TableName: string;
    ColumnName: string;
    IsByteArray: boolean;
    GUID: string;
    IsImagePath: boolean;
    AttachType: null;
    RelationBinding: null;
    Aliases: null;
    IsAggregated: boolean;
    AggregateFunction: number;
    AggregateBindingInfo: null;
    Tag: null;
}

export interface ListViewInfo {
    ListViewName: string;
    BindingTableName: string;
    AllowAddNewRow: boolean;
    AllowEditRow: boolean;
    AllowDeleteRow: boolean;
}
