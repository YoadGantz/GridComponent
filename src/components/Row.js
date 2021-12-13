import React from 'react';

const Row = ({
    row,
    isOdd,
    style,
    isAlternating,
    handleSelect,
    isSelected
}) => (
    <tr className="capitalized">
        <td style={{ backgroundColor: isAlternating && isOdd ? style?.secondaryColor : style?.primaryColor }}>
            <input type="checkbox" checked={isSelected} onChange={() => handleSelect(row.id)} />
        </td>
        {Object.entries(row)
            .filter(entry => entry[0] !== 'id')
            .map(cell => <td style={{ backgroundColor: isAlternating && isOdd ? style?.secondaryColor : style?.primaryColor }} key={cell[0] + cell[1]}>{cell[1]}</td>
        )}
    </tr>
);

export default Row;