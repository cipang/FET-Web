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

export function updateObject(theObject, key, newObject) {
    let result = [];
    for(let i = 0; i < theObject.length; i++) {
        if(theObject[i]["key"] === key){
            result.push(newObject);
        } else if ("children" in theObject[i]) {
            result.push(
                {
                    ...theObject[i],
                    "children": updateObject(theObject[i]["children"], key, newObject)
                }
            );
        } else {
            result.push(theObject[i]);
        }
    }
    return result;
}

export function addObject(theObject, key, newObject) {
    let result = [];
    for(let i = 0; i < theObject.length; i++) {
        if(theObject[i]["key"] === key){
            let updates = {};
            if("children" in theObject[i]){
                updates = {
                    ...theObject[i],
                    "children":[...theObject[i]["children"], newObject]
                };
            } else {
                updates = {
                    ...theObject[i],
                    "children":[newObject]
                };
            }
            result.push(updates);
        } else if ("children" in theObject[i]) {
            result.push(
                {
                    ...theObject[i],
                    "children": addObject(theObject[i]["children"], key, newObject)
                }
            );
        } else {
            result.push(theObject[i]);
        }
    }
    return result;
}

export function generateKey(keyList, key, length) {
    let i = 1;
    let newKey = parseInt(key.toString() + (length + i).toString());
    while(keyList.includes(newKey)) {
        i++;
        newKey = parseInt(key.toString() + (length + i).toString());
    }
    return newKey;
}
