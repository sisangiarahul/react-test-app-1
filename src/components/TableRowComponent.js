import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useState } from 'react';
import CovidSample from '../model/CovidSample';
import { SingleCovidDataContext } from '../model/Context';
import { TableCell, TableCellEdit } from './TableCellComponent';
import PropTypes from 'prop-types';

TableRow.propTypes = {
    tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
    rowData1: PropTypes.instanceOf(CovidSample).isRequired
}

export default function TableRow (props){
    const { tableHeaders} = props;
    const [editMode, setEditMode] = useState(false);
    const [currentRowData, setCurrentRowData] = useState(props.rowData1);
    
    const [singleDataItem, setSingleDataItem] = useContext(SingleCovidDataContext);
    let editedRowData = new CovidSample(props.rowData1);
    let editFlag = false;

    const onEditClick = () => {
        editFlag = false;
        setEditMode(true);
    }
    const onCancelClick = () => {
        editFlag = false;
        editedRowData = new CovidSample(props.rowData1);
        setEditMode(false);
        console.log(singleDataItem);
    }
    const onSaveClick = () => {
        if(editFlag){
            editedRowData.setDirty(true);
            setSingleDataItem(editedRowData);
            setEditMode(false);
        }
    }
    useEffect( () => {
        // BUGFIX: to fix table filter and sort.
        // NOTE: bug in usestate. have to initialise current row setstate, else it picks the old instance data.
        //
        setCurrentRowData(props.rowData1);
        if(props.rowData1.isDirty){
            setEditMode(false);
        }
    },[props.rowData1]);

    const rowtextEditHandler = (columnName, newValue) => {
        editFlag = true;
        editedRowData.setAtributeValue(columnName, newValue);
    }
    let rowCSS = currentRowData.getAtributeValue('isDirty')?'rowSuccesMode':'';
    rowCSS = editMode ? 'rowEditMode' : rowCSS;
    
    return <tr className={rowCSS}>
        <td className="tableButtonCell p=0">
        {    editMode
            ?
            <>
            <Button variant="link" onClick={onSaveClick} className="p-0 cellSave">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon wh-15"><line x1="20" y1="6" x2="6" y2="18"></line><line x1="1" y1="12" x2="6" y2="18"></line>
                </svg>
                <span className="sr-only">Save Row Edit Button</span> 
            </Button>
            <Button variant="link" onClick={onCancelClick} className="p-0 cellCancel">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  className="icon wh-15"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span className="sr-only">Cancel Row Edit Button</span> 
            </Button>
            </>
            :
            <Button variant="link" onClick={onEditClick} className="cellEdit">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  className="icon wh-15"><polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon></svg>
                <span className="sr-only">Row Edit Button</span> 
            </Button>
            
        }
        </td>
        {
            editMode
            ?
            tableHeaders.map((headerVal, idx) => <TableCellEdit key={idx} tableRowData={currentRowData} columnName={headerVal} rowtextEditHandler={rowtextEditHandler}></TableCellEdit>)
            :
            tableHeaders.map((headerVal, idx) => <TableCell key={idx} tableRowData={currentRowData} columnName={headerVal}></TableCell>)
        }
    </tr>
}

