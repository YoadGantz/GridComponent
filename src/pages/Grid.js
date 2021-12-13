import React, { useState } from 'react';
import { orderBy, includes, filter, xor } from 'lodash';
import Header from '../components/Header';
import Row from '../components/Row';
import Pagination from '../components/Pagination';

const Grid = ({
    rows,
    isHeaderEnabled,
    rowsPerPage,
    isAlternating,
}) => {
    const [pageNumber, setPageNumber] = useState(1)
    const [currentSortBy, setCurrentSortBy] = useState('')
    const [currentSearchBy, setCurrentSearchBy] = useState('')
    const [orderDirection, setOrderDirection] = useState('desc')
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [selectedIds, setSelectedIds] = useState(JSON.parse(localStorage.getItem('selectedIds')) || [])

    const sort = (columnTitle) => {
        if (columnTitle === currentSortBy) {
            setOrderDirection((previous) => previous === 'desc' ? 'asc' : 'desc');
            return;
        }
        setOrderDirection('desc')
        setCurrentSortBy(columnTitle)
    }

    const getRowsForCurrentPage = () => {
        const filteredRows = filter(
            rows,
            (row) => Object.values(row)
                .some(cellValue => cellValue.toString().toLowerCase().includes(currentSearchBy)))
        const rowsToShow = orderBy(filteredRows, currentSortBy, orderDirection)
        const firstRowToShow = rowsPerPage * (pageNumber - 1)
        const lastRowToShow = rowsPerPage * pageNumber

        return rowsToShow.slice(firstRowToShow, lastRowToShow)
    }

    const handleSelectAll = () => {
        setSelectedIds([])
        setIsAllSelected(previous => !previous)

        localStorage.setItem('selectedIds', JSON.stringify(selectedIds))
    }

    const handleSelect = (id) => {
        let newSelectedIds = []
        if (isAllSelected) {
            setIsAllSelected(false)
            newSelectedIds = xor(rows.map(row => row.id), [id])
        } else {
            newSelectedIds = xor(selectedIds, [id])
            if (newSelectedIds.length === rows.length) {
                handleSelectAll()
            }
        }
        setSelectedIds(newSelectedIds)
        
        localStorage.setItem('selectedIds', JSON.stringify(newSelectedIds))
    }

    return (
        <div>
            <input type="search" placeholder="Search" onChange={(event) => setCurrentSearchBy(event.target.value.toString().toLowerCase())} />
            <table>
                <thead>
                    {isHeaderEnabled && <Header
                        columnTitles={Object.keys(rows[0]).filter(columnTitle => columnTitle !== 'id')}
                        sort={sort}
                        handleSelectAll={handleSelectAll}
                        checkboxStatus={isAllSelected ? 'checked' : selectedIds.length > 0 ? 'indeterminate' : 'empty'}
                    />}
                </thead>
                <tbody className={isAlternating ? 'alternating' : ''}>
                    {getRowsForCurrentPage().map((row, idx) => <Row
                        key={row.id}
                        row={row}
                        isOdd={idx % 2 !== 0}
                        isAlternating={isAlternating}
                        handleSelect={handleSelect}
                        isSelected={isAllSelected || includes(selectedIds, row.id)}
                    />
                    )}
                </tbody>
            </table>
            <Pagination
                numOfPages={filter(
                    rows,
                    (row) => Object.values(row)
                        .some(cellValue => cellValue.toString().toLowerCase().includes(currentSearchBy))).length / rowsPerPage}
                setPageNum={setPageNumber}
            />
        </div>
    );
}

export default Grid;