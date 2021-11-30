import React from 'react';

const Row = (props) => {
    let { row, isOdd, style, isAlternating, handleSelect, isSelected } = props
    console.log(isSelected);
    return (
        <tr className="capitalized">
            <td style={{ backgroundColor: isAlternating && isOdd ? style?.secondaryColor : style?.primaryColor }}>
                <input className="checkbox" type="checkbox" checked={isSelected} onChange={() => handleSelect(row.id)} />

            </td>
            {Object.entries(row).map(item => {
                if (item[0] === "id") {
                    return
                }
                return <td style={{ backgroundColor: isAlternating && isOdd ? style?.secondaryColor : style?.primaryColor }} key={item[0] + item[1]}>{item[0] !== 'bought' ? item[1] : item[1] ? 'V' : 'X'}</td>
            })}

        </tr>
    );
}

export default Row;