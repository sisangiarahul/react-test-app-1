export const AppConstants = {
  
  apiURL : 'https://services-eu1.arcgis.com/z6bHNio59iTqqSUY/arcgis/rest/services/COVID19_14_Day_Incidence_Rate_per_100k_LEA/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json',

  table1HeaderName : 'All Ireland Data',
  table2HeaderName : 'County and Local Electoral Area (LEA)',
  table3HeaderName : 'LEA Population',
  table4HeaderName : 'Rate of COVID-19 per 100K in selected LEA since August 2020',
  
  table1Headers : ['FID','EventDate','COUNTY', 'ENGLISH', 'LE_ID', 'Pop2016', 'P14_100k_T', 'Ire_IncP14'],
  table2Headers : ['FID','COUNTY', 'ENGLISH'],
  table3Headers : ['FID','ENGLISH', 'Pop2016'],
  table4Headers : ['FID','ENGLISH', 'P14_100k_T'],
  
  tableHeaderNames : [{'name':'FID', 'value':'FID'},{'name':'EventDate', 'value':'Date'},{'name':'COUNTY', 'value': 'COUNTY'}, {'name':'ENGLISH', 'value':'LEA'}, {'name':'LE_ID', 'value': 'LEA ID'}, {'name':'Pop2016', 'value': 'Population'}, {'name':'P14_100k_T', 'value':'14-day Incidence Rate'}, {'name':'Ire_IncP14', 'value': 'Ireland 14 Day Incident Rate'}],

}
