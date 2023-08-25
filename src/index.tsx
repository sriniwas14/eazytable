import { FC, useEffect, useState } from 'react';
import "./main.scss"
import Pagination from './Components/Pagination';
import { SearchIcon } from './assets/icons';

interface ColumnType {
    field: string;
    label: string;
    width?: number;
    render?: (row: RowType) => string;
}

interface RowType extends Object {
    [key: string]: any;
}

interface EazyTableProps {
    title: string;
    columns: Array<ColumnType>;
    data: Array<RowType>;
    rowKeyField: string;
    theme?: string;
    customClass?: string;
    showHeader?: boolean;
    showFooter?: boolean;
    height?: string | number;
    alignText?: any;
    striped?: boolean;
    // itemsPerPage?: number;
    // pagination?: boolean;
}

const EazyTable: FC<EazyTableProps> = ({ title, columns, data, rowKeyField, theme, customClass, showHeader, showFooter, height, alignText, striped }) => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [items, setItems] = useState<RowType[]>([])
    const [filter, setFilter] = useState<string>("")

    useEffect(() => {
        let _data: RowType[] = data
        let _filteredDataset: Set<RowType> = new Set<RowType>()

        if (filter.length > 0) {
            columns.forEach((column: ColumnType) => {
                data.forEach((row: RowType) => {
                    if (!row[column.field]) return
                    let str = row[column.field].toString()
                    if (str.search(filter) !== -1 && !_filteredDataset.has(row))
                        _filteredDataset.add(row)

                })
            })
            setItems([..._filteredDataset])
        } else {
            setItems(_data)
        }

    }, [data, filter])


    return <div style={{ height: `${height}` }} className={`_rui_fullWidth _rui_Main ${striped ? "striped" : ""} ${theme ? theme : "default"} ${(customClass ? customClass : "")}`} >
        {
            (showHeader === undefined || showHeader === true) ?
                <div className="_rui_header">
                    <div className='ruiTitle'>
                        {title}
                    </div>
                    <div className='ruiSearch'>
                        <SearchIcon className="_rui_Search_icon" />
                        <input type='text' placeholder='Search' onChange={(e) => setFilter(e.target.value)} />
                    </div>
                </div>
                : null
        }
        <div className="_rui_table_container">
            <div style={{ height: "auto" }}>
                <table style={{ textAlign: (alignText || "left") }} className='_rui_fullWidth'>
                    <thead>
                        <tr>
                            {
                                columns.map(column => <td width={column.width || 100} key={column.field}>{column.label}</td>)
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((row: RowType) =>
                                <tr key={row[rowKeyField]}>
                                    {
                                        columns.map(column => {
                                            if (column.field)
                                                return (<td key={`${row[rowKeyField]}-${column.field}`} width={column.width || 100}>
                                                    {
                                                        column.render ? column.render(row) : row[column.field]
                                                    }
                                                </td>)

                                        })
                                    }
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
        {
            (showFooter === undefined || showFooter === true) ?

                <div className="_rui_footer">
                    <div className='fuiFooterTitle'>
                        Showing {items.length} Items
                    </div>
                    {/* <div>
                {
                    pagination ? <Pagination
                        totalItems={items.length}
                        currentPage={1}
                        setCurrentPage={() => { }}
                        itemsPerPage={itemsPerPage || 10}
                    /> : null
                }
            </div> */}
                </div>
                : null
        }
    </div >
};

export default EazyTable;