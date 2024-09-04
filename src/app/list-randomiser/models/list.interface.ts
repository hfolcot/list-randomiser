export interface IList {
    listName?: string;
    listContents: any[];
}

export interface IListContent {
    id: number;
    content: string;
    selected: boolean;
}