// src/components/TableManager/types.ts
export interface Field {
  key: string;
  label: string;
  type?: 'text' | 'select';
  options?: { label: string; value: string }[];
  allowEmpty?: boolean;
}

export type DataItem = {
  id: string;
} & Record<string, string | number | null | undefined>;
