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
    baseClass?: string;
    customClass?: string;
    fullWidth?: boolean;
}

const UiTable: FC<UiTableProps> = ({ columns, data, rowKeyField, baseClass, customClass, fullWidth }) => {
    return <table className={`${baseClass ? baseClass : (customClass ? customClass : "default")} ${fullWidth ? "rui_fullWidth" : ""}`}>
        <thead>
            <tr>
                {
                    columns.map(column => <td width={column.width || 100} key={column.field}>{column.label}</td>)
                }
            </tr>
        </thead>
        <tbody>
            {
                data.map((row: RowType) =>
                    <tr key={row[rowKeyField]}>
                        {
                            columns.map(column => <td key={`${row[rowKeyField]}-${column.field}`} width={column.width || 100}>{row[column.field]}</td>)
                        }
                    </tr>
                )
            }
        </tbody>
    </table>;
};

export default UiTable;