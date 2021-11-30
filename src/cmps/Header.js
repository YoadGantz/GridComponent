import React from 'react';

const Header = (props) => {
    let { columns, sort, handleSelectAll, hasUnselected } = props
    return (
        <tr>
            <th>
                <input type="checkbox" className="checkbox" onChange={handleSelectAll} checked={!hasUnselected}></input>
            </th>
            {columns.map(column => {
                return <th className="capitalized" key={column} onClick={() => sort(column)} > { column }</th>
            })}
        </tr >
    );
}

export default Header;