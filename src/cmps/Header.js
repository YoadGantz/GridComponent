import React from 'react';

const Header = ({
    columnTitles,
    sort,
    handleSelectAll,
    hasUnselected
}) => (
    <tr>
        <th>
            <input type="checkbox" onChange={handleSelectAll} checked={!hasUnselected} />
        </th>
        {columnTitles.map(columnTitle => {
            return <th className="capitalized" key={columnTitle} onClick={() => sort(columnTitle)}>{columnTitle}</th>
        })}
    </tr >
);


export default Header;