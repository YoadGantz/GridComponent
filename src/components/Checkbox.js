import React, { useEffect, useRef } from 'react';

const Checkbox = ({ checkboxStatus, handleSelectAll }) => {
    const checkboxRef = useRef()
    useEffect(() => {
        // if (checkboxStatus === 'checked') {
        //     checkboxRef.current.checked = true;
        //     checkboxRef.current.indeterminate = false;
        // } else if (checkboxStatus === 'empty') {
        //     checkboxRef.current.checked = false;
        //     checkboxRef.current.indeterminate = false;
        // } else if (checkboxStatus === 'indeterminate') {
        //     checkboxRef.current.checked = false;
        //     checkboxRef.current.indeterminate = true;
        // }

        // alternative code for the above commented code:
        const map = {
            checked: [true, false],
            empty: [false, false],
            indeterminate: [false, true],
        }
        const [checked, indeterminate] = map[checkboxStatus];
        checkboxRef.current.checked = checked;
        checkboxRef.current.indeterminate = indeterminate;

        // adv: easier to add stuff, also smaller
        // disadv with previous code: 
        // very repetitive and more of a hassle to read and understand: 
        // checkboxRef.current.checked = something
        // checkboxRef.current.indeterminate = something

    }, [checkboxStatus])
    return (
        <th>
            <input type="checkbox" ref={checkboxRef} onChange={handleSelectAll} />
        </th>
    );
}

export default Checkbox;