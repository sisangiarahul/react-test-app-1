import {getFormatedDate} from '../utils/StringUtils';

export default class CovidSample {
    FID = 1;
    isDirty = false;
    COUNTY ;
    EventDate ;

    constructor(sampleData){
        if(sampleData){
            
            if(sampleData.ENGLISH && sampleData.ENGLISH.includes('LEA-')){
                sampleData.ENGLISH = sampleData.ENGLISH.slice(0, sampleData.ENGLISH.length-6);
            }
            Object.assign(this, sampleData);

        }

    }

    isEditableAttribute(attr) {
        return attr !== 'FID';
    }

    getAtributeValue(keyName){
        return keyName === 'EventDate' ? getFormatedDate(this[keyName]) : this[keyName];
    }
    
    setDirty(val){
        this.isDirty = val;
    }

    setAtributeValue(keyName, val){
        this[keyName] = val;
    }

    searchAttributeValue(keyName, val){
        if(keyName === 'EventDate'){
            return getFormatedDate(this.EventDate).includes(val.toLowerCase());
        } else {
            return this[keyName].toString().toLowerCase().includes(val.toLowerCase())
        }
    }
}