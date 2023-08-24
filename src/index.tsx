// MyComponent.tsx
import { FC } from 'react';
import "./main.scss"

interface ColumnType {
    field: string;
    label: string;
    width?: number;
}

interface RowType {
    [key: string]: any;
}

interface UiTableProps {
    columns: Array<ColumnType>;
    data: Array<RowType>;
    rowKeyField: string;
}

const UiTable: FC<UiTableProps> = ({ columns, data, rowKeyField }) => {
    return <table>
        <thead>
            <tr>
                {
                    columns.map(column => <th key={column.field}>{column.label}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((row: RowType) =>
                    <tr key={row[rowKeyField]}>
                        {
                            columns.map(column => <td key={`${row[rowKeyField]}-${column.field}`} width={column.width}>{row[column.field]}</td>)
                        }
                    </tr>
                )
            }
        </tbody>
    </table>;
};

export default UiTable;