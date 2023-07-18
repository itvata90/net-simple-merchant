import { HTMLAttributes, ReactNode, useState } from 'react';
import Form from 'src/core/components/form/form';
import { handleColumnType } from 'src/core/functions/handle-column-type';
import { Column, DataType } from 'src/core/interfaces/components';
import { getFormatDate } from 'src/core/functions/get-format-date';

export interface TableCellInlineEditProps extends HTMLAttributes<HTMLTableCellElement> {
  column: Column;
  onCellChange?: (value: unknown) => void;
  type?: DataType;
  inlineEditing?: boolean;
}

const inputType: {
  [key: string]: any;
} = {
  integer: 'number',
  decimal: 'number',
  text: 'text',
  date: 'date',
  datetime: 'datetime-local',
};

const TableCellInlineEdit = ({
  children,
  column,
  onCellChange,
  type = 'text',
  inlineEditing = true,
  ...props
}: TableCellInlineEditProps) => {
  const [openEditCell, setOpenEditCell] = useState<boolean>(false);

  return (
    <td {...props}>
      <Form.Control
        onTouchEnd={() => setOpenEditCell((prev) => !prev)}
        type={openEditCell ? inputType[type] : null}
        onBlur={() => setOpenEditCell(false)}
        onDoubleClick={() => setOpenEditCell((prev) => !prev)}
        variant={inlineEditing && column?.editable && openEditCell ? 'outlined' : 'plaintext'}
        value={
          openEditCell && (column?.type === 'date' || column?.type === 'datetime')
            ? getFormatDate(children as string, 'yyyy-MM-dd')
            : handleColumnType(children as string, column)
        }
        onChange={(e: any) => onCellChange && onCellChange(new Date(e.target.value))}
        readOnly={!(inlineEditing && column?.editable && openEditCell)}
      />
    </td>
  );
};

export default TableCellInlineEdit;
