// MyComponent.tsx
import { FC } from 'react';

interface ColumnType {
    field: string;
    label: string;
}

interface RowType {
    [key: string]: any;
}

interface UiTableProps {
    columns: Array<ColumnType>;
    data: Array<RowType>;
}

const UiTable: FC<UiTableProps> = ({ columns, data }) => {
    return <table>
        <thead>
            {
                columns.map(column => <th key={column.field}>{column.label}</th>)
            }
        </thead>
        <tbody>
            {
                data.map((row: RowType) =>
                    <tr>
                        {
                            columns.map(column => <td key={row[column.field]}>{row[column.field]}</td>)
                        }
                    </tr>
                )
            }
        </tbody>
    </table>;
};

export default UiTable;