import React from 'react';
import { times } from 'lodash';

const Pagination = ({ setPageNum, numOfPages }) => (
    <div>
        <div>
            Pages
        </div>
        <div>
            {times(Math.ceil(numOfPages), idx => {
                return <button key={`${idx} ${idx+1}`} onClick={() => setPageNum(idx + 1)}>{idx + 1}</button>
            })}
        </div>
    </div>
);

export default Pagination;