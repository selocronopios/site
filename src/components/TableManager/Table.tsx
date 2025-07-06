//src/components/TableManager/Table.tsx
import ActionsCell from './ActionsCell';
import { Field, DataItem } from './types';

interface Props {
  data: DataItem[];
  fields: Field[];
  onEdit: (item: DataItem) => void;
  apiPath: string;
}

export default function Table({ data, fields, onEdit, apiPath }: Props) {
  return (
<table className="w-full text-sm">
  <thead>
    <tr>
      {fields.map((field) => (
        <th
          key={field.key}
          className="p-3 text-left font-medium text-gray-600 bg-gray-100"
        >
          {field.label}
        </th>
      ))}
      <th className="p-3 text-center font-medium text-gray-600 bg-gray-100">
        Ações
      </th>
    </tr>
  </thead>
  <tbody>
    {data.map((item) => (
      <tr key={item.id} className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition">
        {fields.map((field) => (
          <td key={field.key} className="p-3 text-gray-800">
            {item[field.key] ?? '-'}
          </td>
        ))}
        <td className="p-3 text-center">
          <ActionsCell item={item} onEdit={onEdit} apiPath={apiPath} />
        </td>
      </tr>
    ))}
  </tbody>
</table>


  );
}
