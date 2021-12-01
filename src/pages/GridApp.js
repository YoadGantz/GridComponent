import React, { useState, useEffect } from 'react';
import { orderBy, includes, filter, difference, concat } from 'lodash';
import Header from '../cmps/Header';
import Row from '../cmps/Row';
import Pagination from '../cmps/Pagination';

const GridApp = ({
    rows,
    isHeaderEnabled,
    rowsPerPage,
    isAlternating,
}, props) => {
    const [pageNum, setPageNum] = useState(1)
    const [rowsToShow, setRowsToShow] = useState(rows)
    const [currentSortBy, setCurrentSortBy] = useState('')
    const [orderDirection, setOrderDirection] = useState('desc')
    const [selectedIds, setSelectedIds] = useState([])

    useEffect(() => {
        const selectedIdsFromStorage = JSON.parse(localStorage.getItem('selectedIds'))
        if (selectedIdsFromStorage) {
            setSelectedIds(selectedIdsFromStorage)
        }
    }, [])

    const sort = (columnTitle) => {
        if (columnTitle === currentSortBy) {
            setOrderDirection((previous) => previous === 'desc' ? 'asc' : 'desc')
        }
        else {
            setOrderDirection('desc')
            setCurrentSortBy(columnTitle)
        }
        setRowsToShow(orderBy(rows, columnTitle, orderDirection))
    }

    const search = ({ value }) =>
        setRowsToShow(filter(rows, (row) => Object.values(row).some(cellValue => cellValue.toString().toLowerCase().includes(value.toLowerCase()))
        ))

    const getRowsForCurrentPage = () => { // find better function name than paginateRows()
        const firstRowToShow = rowsPerPage * (pageNum - 1)
        const lastRowToShow = rowsPerPage * pageNum
        return rowsToShow.slice(firstRowToShow, lastRowToShow)
    }

    const handleSelectAll = () => {
        let newSelectedIds = []
        const filteredIds = getRowsForCurrentPage().map(row => row.id)
        const differences = difference(filteredIds, selectedIds)
        if (differences.length > 0) {
            newSelectedIds = concat(selectedIds, ...differences)
        } else {
            newSelectedIds.push(...selectedIds.filter(selectedId => !filteredIds.includes(selectedId)))
        }
        setSelectedIds(newSelectedIds)
        localStorage.setItem('selectedIds', JSON.stringify(newSelectedIds))
    }

    const handleSelect = (id) => {
        let newSelectedIds = []
        if (includes(selectedIds, id)) {
            newSelectedIds = selectedIds?.filter(selectedId => selectedId !== id)
        } else {
            newSelectedIds = [...selectedIds, id]
        }
        setSelectedIds(newSelectedIds)
        localStorage.setItem('selectedIds', JSON.stringify(newSelectedIds))
    }

    const checkIfHasUnselected = () => {
        const isSelectedRows = getRowsForCurrentPage()
            .map(row => includes(selectedIds, row.id))
        return isSelectedRows.some(isSelected => !isSelected);
    }


    return (
        <div>
            <input type="search" placeholder="Search" onChange={(event) => search(event.target)} />
            <table>
                <thead>
                    {isHeaderEnabled && <Header
                        columnTitles={Object.keys(rows[0]).filter(columnTitle => columnTitle !== 'id')}
                        sort={sort}
                        handleSelectAll={handleSelectAll}
                        hasUnselected={checkIfHasUnselected()}
                    />}
                </thead>
                <tbody className={isAlternating ? 'alternating' : ''}>
                    {getRowsForCurrentPage().map((row, idx) => <Row
                        key={row.id}
                        row={row}
                        isOdd={idx % 2 !== 0}
                        isAlternating={isAlternating}
                        handleSelect={handleSelect}
                        isSelected={includes(selectedIds, row.id)}
                        {...props}
                    />
                    )}
                </tbody>
            </table>
            <Pagination
                numOfPages={rowsToShow.length / rowsPerPage}
                setPageNum={setPageNum}
            />
        </div>
    );
}

export default GridApp;