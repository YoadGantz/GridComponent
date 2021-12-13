import React, { useEffect, useRef } from 'react';

const Checkbox = ({ checkboxStatus, handleSelectAll }) => {
    const checkboxRef = useRef()
    useEffect(() => {
        if (checkboxStatus === 'checked') {
            checkboxRef.current.checked = true;
            checkboxRef.current.indeterminate = false;
        } else if (checkboxStatus === 'empty') {
            checkboxRef.current.checked = false;
            checkboxRef.current.indeterminate = false;
        } else if (checkboxStatus === 'indeterminate') {
            checkboxRef.current.checked = false;
            checkboxRef.current.indeterminate = true;
        }
    }, [checkboxStatus])
    return (
        <th>
            <input type="checkbox" ref={checkboxRef} onChange={handleSelectAll} />
        </th>
    );
}

export default Checkbox;