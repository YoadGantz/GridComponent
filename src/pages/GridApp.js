import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import Header from '../cmps/Header';
import Row from '../cmps/Row';
import Pagination from '../cmps/Pagination';

const GridApp = (props) => {
    let [pageNum, setPageNum] = useState(1)
    let { columns,
        rows,
        isHeaderEnabled,
        rowsPerPage,
        isAlternating,
        style
    } = props
    let [rowsToShow, setRowsToShow] = useState([...rows])
    let [parameter, setParameter] = useState('')
    let [orderDirection, setOrderDirection] = useState('desc')
    let [selectedIds, setSelectedIds] = useState([])

    useEffect(() => {
        let selectedIdsFromStorage = JSON.parse(localStorage.getItem('selectedIds')) || []
        console.log(selectedIdsFromStorage);
        setSelectedIds(selectedIdsFromStorage)
    }, [])

    const sort = (para = parameter) => {
        if (para === parameter) {
            setOrderDirection((previous) => previous === 'desc' ? 'asc' : 'desc')
        }
        else {
            setOrderDirection('desc')
        }
        setParameter(para)
        setRowsToShow(lodash.orderBy(rows, para, orderDirection).map(p => p))
    }

    const filterBy = (e) => {
        setRowsToShow(lodash.filter([...rows], (row) => {
            let rowAsString = JSON.stringify(row)
            rowAsString = rowAsString.substring(1, rowAsString.length - 1).toLowerCase()
            console.log(rowAsString);
            return rowAsString.includes(e.target.value)
        }).map(p => p))
    }

    const filterRows = () => {
        return rowsToShow.filter((row, idx) => {
            return idx < rowsPerPage * pageNum && rowsPerPage * (pageNum - 1) <= idx
        })
    }

    const handleSelectAll = () => {
        let newSelectedIds = [...selectedIds]
        let filteredIds = filterRows().map(row => {
            return row.id
        })
        if (checkIfHasUnselected()) {
            newSelectedIds.push(...filteredIds.filter((filteredId) => {
                return !selectedIds.includes(filteredId)
            }))
        }
        else {
            newSelectedIds = newSelectedIds.filter(selectedId => {
                return !filteredIds.includes(selectedId)
            })
        }
        setSelectedIds(newSelectedIds)
        localStorage.setItem('selectedIds', JSON.stringify(newSelectedIds))
    }

    const handleSelect = (id) => {
        let newSelectedIds = []
        console.log(id);
        console.log(lodash.includes(selectedIds, id));
        if (lodash.includes(selectedIds, id)) {
            newSelectedIds = selectedIds?.filter(selectedId => {
                return selectedId !== id
            })
        }
        else {
            newSelectedIds = [...selectedIds, id]
        }
        setSelectedIds(newSelectedIds)
        localStorage.setItem('selectedIds', JSON.stringify(newSelectedIds))
    }

    const checkIfHasUnselected = () => {
        let bools = filterRows()
            .map(row => {
                return lodash.includes(selectedIds, row.id)
            })
        let hasUnselected = bools.some(value => !value);
        return hasUnselected;
    }


    return (
        <div>
            <input type="search" placeholder="Search" onChange={(e) => filterBy(e)} />
            <table>
                <thead>
                    {isHeaderEnabled && <Header columns={columns} sort={sort} handleSelectAll={handleSelectAll} hasUnselected={checkIfHasUnselected()} />}
                </thead>
                <tbody className={isAlternating ? 'alternating' : ''}>
                    {filterRows().map((row, idx) => {
                        return <Row
                            style={style}
                            isAlternating={isAlternating}
                            isOdd={idx % 2 !== 0}
                            row={row}
                            key={idx}
                            pageNum={pageNum}
                            rowsPerPage={rowsPerPage}
                            handleSelect={handleSelect}
                            isSelected={lodash.includes(selectedIds, row.id)}
                        />
                    })}
                </tbody>
            </table>
            <Pagination
                numOfRows={rows.length}
                rowsPerPage={rowsPerPage}
                setPageNum={setPageNum}
            />
        </div>
    );
}

export default GridApp;