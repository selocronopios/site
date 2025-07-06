export interface Field {
  key: string;
  label: string;
}

export type DataItem = {
  [key: string]: any;
  id?: string;
  id_pai?: string | null;
};
