import React from 'react';
import { times } from 'lodash';

function Pagination(props) {
    let { setPageNum, rowsPerPage, numOfRows } = props
    return (
        <div>
            <div>
                Pages
            </div>
            <div>
                {times(Math.ceil(numOfRows / rowsPerPage), idx => {
                    return <button key={idx} onClick={() => setPageNum(idx + 1)}>{idx + 1}</button>
                })}
            </div>
        </div>
    );
}

export default Pagination;