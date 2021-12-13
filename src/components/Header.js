import React from 'react';
import Checkbox from './Checkbox';

const Header = ({
    columnTitles,
    sort,
    handleSelectAll,
    checkboxStatus
}) => (
    <tr>
        <Checkbox handleSelectAll={handleSelectAll} checkboxStatus={checkboxStatus}/>
        {columnTitles.map(columnTitle => {
            return <th className="capitalized" key={columnTitle} onClick={() => sort(columnTitle)}>{columnTitle}</th>
        })}
    </tr >
);


export default Header;