export interface IList {
    id: number;
    listName?: string;
    listContents: IListContent[];
}

export interface IListContent {
    id: number;
    content: string;
    selected: boolean;
}

