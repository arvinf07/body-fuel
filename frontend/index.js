const addButtons = document.querySelectorAll('button.btn')
const foodTable = document.getElementById('food-table')
const foodRows = document.getElementsByClassName('food-row')
const createUserBtn = document.querySelector('form button')
let loginForm =  document.getElementById('login-form')

loginForm.addEventListener('submit', loginUser)
createUserBtn.addEventListener('click', newUserForm)
addButtons.forEach( e => e.addEventListener('click', renderFoodForm)) //this is the window because its in the root


Food.getFoods()
Meal.getMeals()


function newUserForm() {
  loginForm.remove()
  document.querySelector('h2').innerHTML += 
  `
    <form id="new-user-form">
      Create New User
      <br>
      Username: <input type="text" required='true' />
      <br>
      Weight: <input type='number' required='true' />
      <br>
      Height: <input type='number' required='true' />
      <br>
      Age: <input type='number' required='true' />
      <br>
      Gender: <input type='text' required='true' />
      <br>
      Password: <input type='password' required='true' />
      <br>
      Password Confirmation: <input type='password' required='true' />
      <br>
      <input type='submit' value='Create Account' />
    </form>
  `
  newUserForm.addEventListener('submit', createNewUser)
}

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

function createOptions(){
  Food.all.forEach( food => {
    let option = document.createElement('option')
    option.value = food.id
    option.innerText = food.name
    document.getElementById('food').appendChild(option)
  })
}

function renderFoodForm(){
  closeOldForm() 
  //hides add button and creates form
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
  createOptions()
  newFoodForm.addEventListener('submit', submitHandler)
}

function closeOldForm(){
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
  let quantity = this.querySelector('input').value
  let newRow = document.createElement('tr')
  const currentRow = this.parentElement.parentElement
  let mealObj = Meal.findByName(getMealName(currentRow).id)

  newRow.classList += 'food-row'
  mealObj.editMeal(foodID, quantity, currentRow)
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
  let currentRow = document.getElementById(`${mealName.toLowerCase()}-btn`)
  const newFoodTr = document.createElement('tr')
  
  displayMacros(meal_food, newFoodTr)
  currentRow.insertAdjacentElement('beforebegin', newFoodTr)    
  newFoodTr.classList += 'food-row'    
  addDeleteBtn(newFoodTr)
}
