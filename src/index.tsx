import { FC, useState } from 'react';
import "./main.scss"
import Pagination from './Components/Pagination';

interface ColumnType {
    field: string;
    label: string;
    width?: number;
}

interface RowType {
    [key: string]: any;
}

interface UiTableProps {
    title: string;
    columns: Array<ColumnType>;
    data: Array<RowType>;
    rowKeyField: string;
    baseClass?: string;
    customClass?: string;
    fullWidth?: boolean;
    itemsPerPage?: number;
    pagination?: boolean;
}

const UiTable: FC<UiTableProps> = ({ title, columns, data, rowKeyField, baseClass, customClass, fullWidth, itemsPerPage, pagination }) => {
    const [currentPage, setCurrentPage] = useState(1)

    return <div className={fullWidth ? "_rui_fullWidth" : ""} style={{ display: "table" }}>
        <div className="_rui_header">
            <div className='ruiTitle'>
                {title}
            </div>
            <div className='ruiSearch'>
                <input type='text' placeholder='Search' />
            </div>
        </div>
        <table className={`${baseClass ? baseClass : (customClass ? customClass : "default")} ${fullWidth ? "_rui_fullWidth" : ""}`}>
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
        </table>
        <div className="_rui_footer">
            <div className='fuiFooterTitle'>
                Showing 5 of 5 Items
            </div>
            <div>
                {
                    pagination ? <Pagination
                        totalItems={data.length}
                        currentPage={1}
                        setCurrentPage={() => { }}
                        itemsPerPage={itemsPerPage || 10}
                    /> : null
                }
            </div>
        </div>
    </div>
};

export default UiTable;