import './TableComponent.scss'
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import TableRow from './TableRowComponent';
import { TableHeader, TableHeaderFilter } from './TableHeaderComponent';
import PropTypes from 'prop-types';
import CovidSample from '../model/CovidSample';

TableComponent.propTypes = {
    headerName: PropTypes.string.isRequired,
    tableHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
    covidData: PropTypes.arrayOf(PropTypes.instanceOf(CovidSample)).isRequired,
}

export default function TableComponent(props){
    
    const [tableData, setTableData] = useState(props.covidData);

    const onFilterTableData = (columnName, filterText) => {
        if(filterText.trim().length === 0 && tableData.length === props.covidData.length) {
            return;
        } 
        const filteredTableData = props.covidData.filter( tableRowData => 
            {
                return tableRowData.searchAttributeValue(columnName, filterText);
            });
            
        setTableData(filteredTableData);
    }
    
    const onSortTableData = (columnName, sortBy) => {
        const sortTableData = [...props.covidData];
        sortTableData.sort((a,b) => {
            if (a.getAtributeValue(columnName) < b.getAtributeValue(columnName)) {
                return sortBy === 'asc' ? -1 : 1;
              }
              if (a.getAtributeValue(columnName) > b.getAtributeValue(columnName)) {
                return sortBy === 'asc' ? 1 : -1;
              }
              return 0;
        })
            
        setTableData(sortTableData);
    }

    useEffect( () => {
        if(props.covidData) {
            setTableData(props.covidData);
        }
    }, [props.covidData] );
    
    return <div className="tableWrap">
    <Card>
        <Card.Header>{props.headerName}</Card.Header>
        <Card.Body className="p-0 m-0">
        <Table striped bordered hover size="sm" responsive className="m-0">
            <thead>
                <tr>
                    <th rowSpan="2">{}</th>
                    {
                        props.tableHeaders.map((column, idx) => 
                        <TableHeader key={idx} column={column} onSortTableData={onSortTableData}>
                        </TableHeader>)
                        
                    }
                    
                </tr>
                <tr>
                    {
                        props.tableHeaders.map((column, idx) => 
                        <TableHeaderFilter key={idx} column={column} onFilterTableData={onFilterTableData} >
                        </TableHeaderFilter>)
                        
                    }
                    
                </tr>
            </thead>
            <tbody>
            {
                tableData.map((sampleData, idx) =>  <TableRow key={idx} tableHeaders={props.tableHeaders} rowData1={sampleData}></TableRow> ) 
            } 
            
            </tbody>
        </Table>


        </Card.Body>
    </Card>
    
    </div>
}


