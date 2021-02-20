const addButtons = document.querySelectorAll('button')

addButtons.forEach( e => e.addEventListener('click', renderFoodForm))

getFoods()
function getFoods(){
  fetch('http://127.0.0.1:3000/foods')
  .then(resp => resp.json())
  .then( json => makeFood(json) )
}

function makeFood(json){
  json.forEach( food => new Food(food))
}


function renderFoodForm(){
  this.style.visibility = 'hidden'
  let newFoodForm = document.createElement('form')
  newFoodForm.innerHTML = `
    <select name="food_name" id="food">
    </select>
    Quantity(in grams)
    <input type='number' min=0 required='true'>
    <input type="submit" value="Log Food">
  `
  this.parentElement.appendChild(newFoodForm)
  newFoodForm.addEventListener('submit', submitHandler)
  createDropDown()
}

//move inner part to class function
function createDropDown(){
  Food.all.forEach( food => {
    let option = document.createElement('option')
    option.value = food.id
    option.innerText = food.name
    document.getElementById('food').appendChild(option)
  })
}

function submitHandler(e){
  //Optimistic approach.
  e.preventDefault()
  let food = this.querySelector('select').value
  let foodName = this.querySelector('select').querySelector(`option[value="${food}"]`).innerText
  let quantity = this.querySelector('input').value
  let newRow = document.createElement('tr')
  let mealName = this.parentElement.parentElement.previousSibling.id
  //Ajax 
  createMeal(food, quantity, mealName)

  newRow.innerHTML = `<td>${foodName} - ${quantity} grams</td>`
  document.querySelector('tbody').insertBefore(newRow, this.closest('tr'))
  this.previousElementSibling.style.visibility = ''
  this.remove()
}

function createMeal(foodId, foodAmount, mealName){
  const body = {meal: {name: mealName, meal_foods_attributes: {food_id: foodId, amount: foodAmount}}}
  const configObj = {
    
  }

  fetch('http://127.0.0.1:3000/meals', configObj)
  .then(resp => resp.json())
  .then()
}
