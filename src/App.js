import './App.scss';
import {useState, useEffect} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert'
import TableComponent from './components/TableComponent';
import { APIServiceProvider } from './utils/APIServiceProvider';
import CovidSample from './model/CovidSample';
import { SingleCovidDataContext } from './model/Context';
import { AppConstants } from './AppConstants';

function App() {
  const [isLoading, setLoading] = useState(true);
  const [ covidData, setCovidData] = useState();
  const [singleDataItem, setSingleDataItem] = useState( new CovidSample());

  useEffect(() => {
    if (isLoading) {
      APIServiceProvider.getData()
        .then((parsedResponse) => {
          setCovidData(parsedResponse);
          setLoading(false);
        }).catch(error => {
          console.error('API error', error)
          setCovidData(null);
          setLoading(false);  
        });
    }
  }, [isLoading]);

  useEffect( () => {
    if(singleDataItem.isDirty){
      const updatedCovidData = covidData.map( (singleItem) => {
        if( singleItem.FID === singleDataItem.FID ){
          singleItem = new CovidSample(singleDataItem);
        } else {
          singleItem.setDirty(false);
        }
        return singleItem;
      });
      setCovidData(updatedCovidData);
    }
  }, [singleDataItem] )

  const handleClick = () => {
    setLoading(true);
    setCovidData(null);
  }
  return (
    <div className="App">
      <Navbar bg="light" expand="lg" >
        <Navbar.Brand >Coronavirus (Covid-19) Dashboard for Ireland</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link href="https://www.google.com/search?q=covid+19+ireland&tbm=nws">COVID-19 News</Nav.Link>
          </Nav>
          <Button variant="primary" size="sm"
              disabled={isLoading}
              onClick={!isLoading ? handleClick : null}
              
            >
              {isLoading ? 'Loading…' : 'Fetch New Data'}
            </Button>
        </Navbar.Collapse>
        
      </Navbar>
      <div className='mainContent'>
        
          <SingleCovidDataContext.Provider value={[singleDataItem, setSingleDataItem]}>
          <Container fluid>
            <Row >
            <Col xl={12} >
                <h1>Ireland's County-wise stats in a tabular View</h1>
                <p>
                  The information presented in this site is based on official figures provided by the Health Protection Surveillance Centre (HPSC) and the Health Service Executive (HSE). The data has been fetched from Ireland's Geospatial Data Hub.
                </p>

                </Col>
            </Row>
          {
              covidData ? 
              <>
              <Row >
                <Col xl={12} >
                  
                  <TableComponent headerName={AppConstants.table1HeaderName} tableHeaders={AppConstants.table1Headers} covidData={covidData} ></TableComponent>
                </Col>
              </Row>
              <Row>
                <Col md={12} lg={6} xl={4} ><TableComponent headerName={AppConstants.table2HeaderName} tableHeaders={AppConstants.table2Headers} covidData={covidData} ></TableComponent></Col>
                <Col md={12} lg={6} xl={4} ><TableComponent headerName={AppConstants.table3HeaderName} tableHeaders={AppConstants.table3Headers} covidData={covidData} ></TableComponent></Col>
                <Col md={12} lg={6} xl={4} ><TableComponent headerName={AppConstants.table4HeaderName} tableHeaders={AppConstants.table4Headers} covidData={covidData} ></TableComponent></Col>
                
                </Row> 
              </>
              :  
                isLoading ? 
                <>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                 {' loading data '}
                </>
              :
                <Alert variant="danger" onClose={() => setLoading(true)} dismissible>
                <Alert.Heading>Sorry!</Alert.Heading>
                <p>
                  Cannot Get data at this time, try again later.
                </p>
                </Alert>
              
          }
          </Container>
          </SingleCovidDataContext.Provider>
        </div>
    </div>
  );
}


export default App;