export interface IList {
    listName?: string;
    listContents: IListContent[];
}

export interface IListContent {
    id: number;
    content: string;
    selected: boolean;
}