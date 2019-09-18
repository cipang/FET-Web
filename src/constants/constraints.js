export const spaceConstraintList = [
  {
    name:"Rooms",
    children:["A room's not available rooms"]
  },
  {
    name:"Teachers",
    children:[
      "A teacher has a home room",
      "A teacher has a set of home rooms",
      "Max building changes per day for a teacher",
      "Max building changes per week for a teacher",
      "Min gaps bewtween building changes for ateacher",
      "Max building changes per day for all teachers",
      "Max building changes per week for all teachers",
      "Min gaps bewtween building changes for all teachers"
    ]
  },
  {
    name:"Students",
    children:[
      "A student has a home room",
      "A student has a set of home rooms",
      "Max building changes per day for a student",
      "Max building changes per week for a student",
      "Min gaps bewtween building changes for astudent",
      "Max building changes per day for all students",
      "Max building changes per week for all students",
      "Min gaps bewtween building changes for all students"
    ]
  },
  {
    name:"Subjects",
    children:[
      "A subject has a preferred room",
      "A subject has a set of preferred rooms",
    ]
  },
  {
    name:"Activity tags",
    children:[
      "An activity tag has a preferred room",
      "An activity tag has a set of preferred rooms",
    ]
  },
  {
    name:"Subjects and activity tags",
    children:[
      "A subject + a activity tag has a preferred room",
      "A subject + a activity tag has a set of preferred rooms",
    ]
  },
  {
    name:"Acitivities",
    children:[
      "An activity has a preferred room",
      "An activity has a set of preferred rooms",
      "A set of activities are in the same room if they are consecutive",
      "A set of activities occupies max different rooms",
    ]
  }
]
