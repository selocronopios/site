export interface Field {
  key: string;
  label: string;
}

export interface DataItem {
  [key: string]: string | number | null | undefined;
  id?: string;
  id_pai?: string | null;
}
