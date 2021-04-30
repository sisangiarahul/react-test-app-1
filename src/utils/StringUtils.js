export function getFormatedDate(value) {
    const dateVal = new Date(value);
    return `${dateVal.getMonth()+1}/${dateVal.getDate()}/${dateVal.getFullYear()}`;
}

export function getFilteredText(value, filterText){
    if(value === "") return "";
    const textVal = /^[a-z0-9]+$/i.test(value) ? value : filterText;
    return textVal
}