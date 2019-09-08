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

export function delObjects(theObject, keys) {
    let result = [...theObject];
    keys.map(key => {
      result = delObject(result, key)
    });
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

export function mapColumns(columns) {
    let result = [];
    columns.map(col => {
        if (!col.editable) {
            result.push(col);
        } else{
            result.push(
                {
                    ...col,
                    onCell: record => ({
                        record,
                        title: col.title
                    }),
                }
            );

        }
    });
    return result
}


function generateHexString(length) {
    let ret = "";
    while (ret.length < length) {
        ret += Math.random().toString(16).substring(2);
    }
    return ret.substring(0,length);
}

export function generateUniqueKey(keyList, length) {
    let newKey = generateHexString(8);
    while(keyList.includes(newKey)) {
        newKey = generateHexString(8);
    }
    return newKey;
}

export function generateActivityKey(keyList) {
    if(keyList.length === 0){
        return 1;
    } else{
        return keyList[keyList.length-1] + 1;
    }
}

function serializeData(data, name) {
    let result = "";
    data.map(childData => {
        result = result.concat(childData[name], ",");
    })
    result = result.substring(0, result.length - 1);
    return result;
}

function serializeAcitivity(activity) {
  let children = [];
  let teachers = serializeData(activity.teachers, "teacher");
  let tags = serializeData(activity.tags, "tag");
  let students = serializeData(activity.students, "students");
  let totalDuration = activity.totalDuration;

  activity.children.map(child => {
      children.push({
          ...child,
          duration: child.duration + "/" + totalDuration,
          teachers,
          tags,
          students
      })
  });
  console.log(activity)

  return {
      ...activity,
      duration: activity.totalDuration,
      students,
      teachers,
      tags,
      children
  };
}

export function serializeActivities(activities) {
    let result = [];
    activities.map(activity => {
        result.push(serializeAcitivity(activity))
    });
    return result;
}

export function createActivity(raw, keyList) {
    let sum = 0;
    let children = [];
    let newKey = generateActivityKey(keyList);
    keyList.push(newKey);

    let mainData = {
      active:raw.active.toString(),
      durations:raw.durations,
      subject:raw.selectedSubject,
      teachers:raw.selectedTeachers,
      tags:raw.selectedTags,
      students:raw.selectedStudents
    }

    Object.keys(raw.durations).map(duration => {
        sum += raw.durations[duration];
        let childKey = generateActivityKey(keyList);
        keyList.push(childKey);
        children.push({
            ...mainData,
            key:childKey,
            duration: raw.durations[duration].toString(),
        })
    });

    return {
        ...mainData,
        key:newKey,
        totalDuration: sum.toString(),
        children
    };

}

export function refreshActivities(activities) {
  let newData = [];
  let ommitedKeys = [];
  activities.map(activity => {
      if(activity["children"]){
          let sum = 0;
          activity["children"].map(child => {
              sum += child["duration"];
          });
          if(sum !== activity["duration"]) {
              let newChildren = [];
              activity["children"].map(child => {
                  newChildren.push({
                    ...child,
                    duration: child["duration"].toString() + "/" + sum.toString(),
                  });
              });
              newData.push({
                ...activity,
                duration:sum,
                children:newChildren
              });
          } else {
              newData.push(activity);
          }
      } else{
          ommitedKeys.push(activity["key"]);
      }
  });
  return {newData, ommitedKeys};
}

export function objects2Array(objects){
    let result = [];
    Object.keys(objects).map(key => {
        result.push({
            ...objects[key],
            key
        })
    });
    return result;
}


export function initializeTimetableOrderManagement(timetables) {
    let orderResult = initializeOrderForAllTimeTables(timetables);
    let dataMapResult = initializeDataMapForAllTimeTables(timetables, orderResult);

    return ({
      "finalTimetablesOrders": orderResult,
      "finalTimetablesDataMap": dataMapResult,
    });
}

function initializeOrderForAllTimeTables(timetables){
    const { subgroups, teachers } = timetables;
    let result = {};
    let newSubgroups = {};
    let newTeachers = {};

    subgroups.map(subgroup =>
      newSubgroups[subgroup.name] = initializeOrderForOneTimetable(subgroup.days)
    )
    teachers.map(teacher =>
      newTeachers[teacher.name] = initializeOrderForOneTimetable(teacher.days)
    )

    result["subgroups"] = newSubgroups;
    result["teachers"] = newTeachers;

    return result;
}

function initializeDataMapForAllTimeTables(timetables, timetableOrders){
    const { subgroups, teachers } = timetables;
    let result = {};
    let newSubgroups = {};
    let newTeachers = {};

    subgroups.map(subgroup =>
      newSubgroups[subgroup.name] =
          initializeDataMap(
                             subgroup.days,
                             timetableOrders["subgroups"][subgroup.name],
                             "teachers"
                           )
    )
    teachers.map(teacher =>
      newTeachers[teacher.name] =
          initializeDataMap(
                             teacher.days,
                             timetableOrders["teachers"][teacher.name],
                             "students"
                           )
    )

    result["subgroups"] = newSubgroups;
    result["teachers"] = newTeachers;

    return result;
}

// map key to dispaly string e.g. { Monday_11 : "physics by teacher1" }
function initializeDataMap(timetableData, timetableOrder, type){
  let dataMap = {};
  let count = -1;
  timetableData.map(day => (
    day.hours.map(hour => {
      count += 1;
      let subject = "";
      let teachersOrStudentsStr = "";
      let tagsStr = "";
      if(!hour.hasOwnProperty("empty")) {
        console.log(hour, hour[type]);
        subject = hour.subject;
        hour[type].map(x => teachersOrStudentsStr += (x.name + " "));
        hour.activity_tag.map(tag => tagsStr  += (tag.name + " "));
        dataMap[timetableOrder[count]] = subject + " by " + teachersOrStudentsStr;
      } else {
        dataMap[timetableOrder[count]] = "NA";
      }
    })
  ))
  return dataMap;
}

function initializeOrderForOneTimetable(days){
    let order = [];
    let numberOfHours = days[0].hours.length;
    let numberOfDays = days.length;
    for(let i = 0; i < numberOfHours; i++ ){
      for(let j = 0; j < numberOfDays; j++ ) {
        order.push(days[j].name + "_" + days[j].hours[i].name);
      }
    }
    // days.map(day =>
    //   day.hours.map(hour => orders.push(day.name + "_" + hour.name) )
    // );
    return order;
}

const basicDataStructure = {
  keyList:[],
  data:[]
};

export const activityTemplate ={
  error:null,
  split:1,
  active:true,
  selectedSubject:"",
  selectedTeachers:[],
  selectedTags:[],
  selectedStudents:[],
  durations:{}
};

export const timetableTemplate = {
  new:true,
  showModal:false,
  key:null,
  step:0,
  name:'',
  days:[],
  numberOfPeriodsPerDay:8,
  periods:{},
  numberOfSubjects:1,
  subjects:basicDataStructure,
  teachers:basicDataStructure,
  students:basicDataStructure,
  tags:basicDataStructure,
  newActivity:activityTemplate,
  activities:{
    data:[],
    keyList:[]
  },
  buildings:basicDataStructure,
  rooms:basicDataStructure,
};


// firebase will omit empty data, which will result data is null
export function validateData(timetable) {
    let dataNeedsToBeChecked = ["subjects","teachers","students","tags","buildings","rooms","activities"]
    let result = {};
    dataNeedsToBeChecked.map(data => {
        console.log(timetable[data])
        if("data" in timetable[data]) {
            result[data] = {...timetable[data]};
        } else{
            result[data] = basicDataStructure;
        }
    });

    return {
      ...timetable,
      ...result
    }
}
