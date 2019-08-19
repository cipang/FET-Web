export function getObject(theObject, key) {
    let result = null;
    if(theObject instanceof Array) {
        for(let i = 0; i < theObject.length; i++) {
            result = getObject(theObject[i],key);
            if (result) {
                break;
            }
        }
    } else {
        for(let prop in theObject) {
            // console.log(prop + ': ' + theObject[prop]);
            if(prop === 'key') {
                // console.log(theObject[prop], key);
                if(theObject[prop] === key) {
                    return theObject;
                }
            }
            if(theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                result = getObject(theObject[prop],key);
                if (result) {
                    break;
                }
            }
        }
    }
    return result;
}


export function delObject(theObject, key) {
    let result = [];
    for(let i = 0; i < theObject.length; i++) {
        if(theObject[i]["key"] === key){
          
        } else if ("children" in theObject[i]) {
            result.push(
                {
                    ...theObject[i],
                    "children": delObject(theObject[i]["children"], key)
                }
            );
        } else {
            result.push(theObject[i]);
        }
    }
    return result;
}
