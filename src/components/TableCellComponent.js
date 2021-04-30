import { useState } from 'react';
import { getFilteredText } from '../utils/StringUtils';
import PropTypes from 'prop-types';
import CovidSample from '../model/CovidSample';

TableCell.propTypes = {
    columnName: PropTypes.string.isRequired,
    tableRowData: PropTypes.instanceOf(CovidSample).isRequired
}

export function TableCell ({columnName, tableRowData}) {
    return <td>
        {tableRowData.getAtributeValue(columnName)}
    </td>
}

TableCellEdit.propTypes = {
    columnName: PropTypes.string.isRequired,
    tableRowData: PropTypes.instanceOf(CovidSample).isRequired,
    rowtextEditHandler: PropTypes.func.isRequired
}
export function TableCellEdit ({columnName, tableRowData, rowtextEditHandler}) {
    const [val, setVal] = useState(tableRowData.getAtributeValue(columnName));
    const onTextChange = (evt) => {
        const textVal = getFilteredText(evt.target.value, val);
        setVal(textVal);
        rowtextEditHandler(columnName, textVal);
        
    }
    
    return <td>
        {
            columnName === 'FID' 
            ?
            val 
            :
             <input type='text' value={val} onChange={onTextChange} />
        }
        
    </td>
}