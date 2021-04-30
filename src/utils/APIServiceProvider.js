import { AppConstants } from '../AppConstants';
import CovidSample from '../model/CovidSample';

export const APIServiceProvider = {
    getData
}
    function getData() {
      const requestOptions = {
        method: 'POST'
      };
      
      return fetch(AppConstants.apiURL, requestOptions)
                .then(response => response.json())
                .then((response) => {
                    return response.features.splice(0,10).map((singleItem) => { return new CovidSample(singleItem.attributes)});
                });
    
    }

