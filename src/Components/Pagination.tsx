import React, { FC, useEffect, useState } from 'react'

interface PaginationProps {
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
    setCurrentPage(page: number): void;
}

const Pagination: FC<PaginationProps> = ({ totalItems, currentPage, itemsPerPage }) => {
    const [pageCount, setPageCount] = useState(0)

    useEffect(() => {
        setPageCount(Math.ceil(totalItems / itemsPerPage));
    }, [totalItems])

    return (
        <div></div>
    )
}

export default Pagination