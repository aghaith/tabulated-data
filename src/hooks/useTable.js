import { useMemo, useState, useEffect } from 'react';

const useTable = ({ columns, data, pagination }) => {
    const [pageIndex, setPageIndex] = useState(0);

    const headers = useMemo(() =>
        columns.map((column) => ({
            label: column.label
        })),
        [columns]
    );

    const rows = useMemo(() => {
        const rawRows = pagination
            ? data.slice(pageIndex * pagination.pageSize, (pageIndex + 1) * pagination.pageSize)
            : data;
        return rawRows.map((dataRow) => {
            const cells = columns.map(({ accessor }) => {
                const renderedValue = typeof accessor === 'function' ? accessor(dataRow) : dataRow[accessor];
                return { renderedValue };
            })
            return { cells };
        })
    }, [columns, data, pageIndex, pagination?.pageSize]);

    const totalPages = Math.ceil(data.length / pagination.pageSize)

    const nextPage = () => {
        setPageIndex((pageIndex) => Math.min(pageIndex + 1, totalPages - 1));
    }

    const previousPage = () => {
        setPageIndex((pageIndex) => Math.max(pageIndex - 1, 0));
    }

    useEffect(() => {
        if (pageIndex > totalPages - 1) {
            setPageIndex(totalPages - 1);
        }
    }, [data, pageIndex, pagination?.pageSize])

    return {
        headers,
        pagination: pagination ? {
            nextPage,
            pageNumber: pageIndex + 1,
            previousPage,
            totalPages,
        } : null,
        rows,
    };
}

export default useTable;
