const employees = [
  { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 },
  { id: 3, name: 'curly', managerId: 1 },
  { id: 5, name: 'groucho', managerId: 3 },
  { id: 6, name: 'harpo', managerId: 5 },
  { id: 8, name: 'shep Jr.', managerId: 4 },
  { id: 99, name: 'lucy', managerId: 1 }
]

const spacer = (text) => {
  if (!text) {
    return console.log('')
  }
  const stars = new Array(5).fill('*').join('')
  console.log(`${stars} ${text} ${stars}`)
}


const findEmployeeByName = (name, array) => {

  for (let i = 0; i < array.length; i++) {
    if (array[i].name == name) {
      return array[i]
    }

  }

}


spacer('findEmployeeByName Moe')
// given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees))//{ id: 1, name: 'moe' }
spacer('')


const findManagerFor = (func, array) => {

  const a = func.managerId
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == a) {
      return array[i]
    }
  }

}

spacer('findManagerFor Shep')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees))//{ id: 4, name: 'shep', managerId: 2 }
spacer('')


const findCoworkersFor = (empl, array) => {
  let arrayEmpl = []
  const emplManID = empl.managerId
  for (let i = 0; i < array.length; i++) {
    if (array[i].managerId == emplManID && array[i] != empl) {
      arrayEmpl.push(array[i])
    }
  }
  return arrayEmpl
}
spacer('findCoworkersFor Larry')

//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees))/*
  [ { id: 3, name: 'curly', managerId: 1 },
    { id: 99, name: 'lucy', managerId: 1 } ]
  */


const findManagementChainForEmployee = (empl, array) => {
  const emplChain = empl.managerId
  let listArray = []
  if (!empl.managerId) {
    return []
  }
  else {
    let lastId = empl.managerId
    array.find(function (val) {
      listArray.push(val)
      return lastId === val.id
    })

  }
  return listArray
}


spacer('')

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees))//[  ]
spacer('')

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees))/*
  [ { id: 1, name: 'moe' },
    { id: 2, name: 'larry', managerId: 1 },
    { id: 4, name: 'shep', managerId: 2 }]
  */
spacer('')
var employees2 = employees
var arr = []
function generateManagementTree(array) {
  const a = array[0]
  array.shift()
  //var arr=[]
  a.child = a
  arr.push(a)

  if (array.length < 1) { console.log(arr) }

  else { return generateManagementTree((array)) }

}

spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees2), null, 2))
/*
{
  "id": 1,
  "name": "moe",
  "reports": [
    {
      "id": 2,
      "name": "larry",
      "managerId": 1,
      "reports": [
        {
          "id": 4,
          "name": "shep",
          "managerId": 2,
          "reports": [
            {
              "id": 8,
              "name": "shep Jr.",
              "managerId": 4,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "curly",
      "managerId": 1,
      "reports": [
        {
          "id": 5,
          "name": "groucho",
          "managerId": 3,
          "reports": [
            {
              "id": 6,
              "name": "harpo",
              "managerId": 5,
              "reports": []
            }
          ]
        }
      ]
    },
    {
      "id": 99,
      "name": "lucy",
      "managerId": 1,
      "reports": []
    }
  ]
}
*/
spacer('')
function displayManagementTree(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].managerId === undefined) {
      console.log(array[i].name)
    }
    if (array[i].managerId !== undefined) {
      let a = array[i].managerId
      if (a == 1) {
        console.log(`-${array[i].name}`)
      }
      if (a == 2) {
        console.log(`--${array[i].name}`)
      }
      if (a > 2) {
        console.log(`---${array[i].name}`)
      }
    }
  }
}

spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(employees)/*
  moe
  -larry
  --shep
  ---shep Jr.
  -curly
  --groucho
  ---harpo
  -lucy
  */
