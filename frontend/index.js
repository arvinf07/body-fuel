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

function displayMacros({food, id, foodAmount}, newRow){
  let {calories, protein, fat, carb} = food.createMacros(foodAmount)
  newRow.innerHTML = `
  <td data-food-id=${food.id} data-meal-food-id=${id}> <b>${food.name}</b> - ${foodAmount} grams
  <br>${calories} calories  |
    <span class="fats">${fat}g fat</span>  |
    <span class="carbs">${carb}g carbohydrate</span>  |
    <span class="proteins">${protein}g protein</span>
  </td>
  `
}

function getMealName(row) {
  let previous = row.previousSibling;
  while (!previous.classList.contains('meals')) {
    previous = previous.previousSibling;
  }
  return previous;
}

function submitHandler(e){
  // what is neccessary here?
  e.preventDefault()
  let foodID = this.querySelector('select').value
  let foodName = this.querySelector('select').querySelector(`option[value="${foodID}"]`).innerText
  let quantity = this.querySelector('input').value
  let newRow = document.createElement('tr')
  newRow.classList += 'food-row'

  const currentRow = this.parentElement.parentElement
  let mealObj = Meal.findByName(getMealName(currentRow).id)
  mealObj.editMeal(foodID, quantity)
  this.previousElementSibling.style.visibility = ''
  this.remove()
}

function addDeleteBtn(newRow){
  let deleteBtn = document.createElement('button')
  deleteBtn.textContent = 'Remove'
  deleteBtn.addEventListener('click', Food.handleDelete)
  deleteBtn.classList += 'remove-btn btn btn-danger btn-sm'
  newRow.appendChild(deleteBtn)
}

function displayMeals(json){
  json.forEach(meal => {
    let mealObj = new Meal(meal)
    if (mealObj.mealFoods.length != 0){
      mealObj.mealFoods.forEach( meal_food => displayMealFood(meal_food, mealObj.name))
    }
  })
}

//display one mealFood at a time
function displayMealFood(meal_food, mealName) {
  let mealRow = document.getElementById(mealName.toLowerCase())
  const newFoodTr = document.createElement('tr')

  displayMacros(meal_food, newFoodTr)
  mealRow.insertAdjacentElement('afterend', newFoodTr)    
  newFoodTr.classList += 'food-row'    
  addDeleteBtn(newFoodTr)
}
