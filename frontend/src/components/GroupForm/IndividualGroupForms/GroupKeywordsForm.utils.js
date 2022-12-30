export function setKeywords(keywordList, keywordIds) {
    const outputArray = [];
    for(let i = 1; i <= keywordList.length; i++) {
        outputArray.push(keywordIds.indexOf(i) !== -1);
    }
    return outputArray;
}

export function saveKeywords(keywordList, checkedKeywords) {
    const keywordsToSave = [];
    for(let i = 1; i <= keywordList.length; i++) {
        if(checkedKeywords[i - 1]) {
            keywordsToSave.push(i);
        }
    }
    return keywordsToSave;
}

