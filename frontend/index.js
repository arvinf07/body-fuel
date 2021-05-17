const addButtons = document.querySelectorAll('button')
const foodTable = document.getElementById('food-table')
const foodRows = document.getElementsByClassName('food-row')

addButtons.forEach( e => e.addEventListener('click', renderFoodForm)) //this is the window because its in the root


Food.getFoods()
Meal.getMeals()


function createCancelBtn(newFoodForm){
  let cancelBtn = document.createElement('button')
  cancelBtn.textContent = 'Cancel'
  cancelBtn.classList += "remove-btn btn btn-danger btn-sm cancel-btn"
  newFoodForm.appendChild(cancelBtn)

  cancelBtn.addEventListener('click', e => {
    newFoodForm.previousElementSibling.style.visibility = ''
    newFoodForm.remove()
  })
}

function renderFoodForm(){
  closeOldForm() 
  
  //hides button and creates form
  this.style.visibility = 'hidden'
  let newFoodForm = document.createElement('form')
  newFoodForm.innerHTML = `
    <select name="food_name" id="food">
    </select>
    Quantity(in grams)
    <input type='number' min=1 required='true'>
    <input class='btn btn-primary btn-sm' type="submit" value="Log Food">
  `
  createCancelBtn(newFoodForm)
  this.parentElement.appendChild(newFoodForm)
  Food.createOptions()
  newFoodForm.addEventListener('submit', submitHandler)
}

function closeOldForm(){
  //Closes old food form
  let oldForm = document.querySelector('form')
  if (oldForm){
    oldForm.previousElementSibling.style.visibility = ''
    oldForm.remove()
  }
}

function getMealName(row) {
  let previous = row.previousSibling;
  while (!previous.classList.contains('meals')) {
    previous = previous.previousSibling;
  }
  return previous;
}

function submitHandler(e){
  //Optimistic approach.
  e.preventDefault()
  let foodID = this.querySelector('select').value
  let foodName = this.querySelector('select').querySelector(`option[value="${foodID}"]`).innerText
  let quantity = this.querySelector('input').value
  let newRow = document.createElement('tr')
  newRow.classList += 'food-row'

  const currentRow = this.parentElement.parentElement
  let mealObj = Meal.findByName(getMealName(currentRow).id)
  mealObj.editMeal(foodID, quantity)

  newRow.innerHTML = `<td>${foodName} <br><span class='quantity'>${quantity} grams</span>  - 
  ${Food.findByID(parseFloat(foodID)).displayCalories(quantity)} calories</td>`

  newRow.dataset.id = foodID
  document.querySelector('tbody').insertBefore(newRow, getMealName(currentRow).nextElementSibling)
  addDeleteBtn(newRow)
  this.previousElementSibling.style.visibility = ''
  this.remove()
}

function addDeleteBtn(newRow){
  let deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Remove'
  deleteBtn.addEventListener('click', handleDelete)
  deleteBtn.classList += 'remove-btn btn btn-danger btn-sm'
  newRow.appendChild(deleteBtn)
}


// Move to meal class or food IDK
function handleDelete(e){
  let mealFoodID = e.target.previousElementSibling.dataset.mealFoodId
  e.target.parentElement.remove()

  const body = {meal_food: {id: mealFoodID}}
  const configObject = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(body)
  }; 
  fetch(`http://127.0.0.1:3000/meal_foods/${mealFoodID}`, configObject)
    .then(resp => console.log(resp))
    .catch( error => console.log(error))
}

// FILTER SEARCH
// const ul = document.getElementById('food-list')
// function makeLis(){
//   Food.all.forEach( food => {
//     let li = document.createElement('li')
//     li.innerText = food.name
//     ul.appendChild(li)
//   })
// }

// function filter(){
//   let input = document.querySelector('div.filter input')
//   let filterValue = document.querySelector('div.filter input').value.toUpperCase()
//   let lis = document.getElementsByTagName('li')
//   for(let i = 0; i < lis.length; i++){
//     let textValue = lis[i].innerText
//     if (textValue.toUpperCase().indexOf(filterValue) > 1){
//       lis[i].style.diplay = ''
//     }else{
//       lis[i].style.display = 'none'
//     }
  
//   }
    

// }
