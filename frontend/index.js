const addButtons = document.querySelectorAll('button')
const foodTable = document.getElementById('food-table')

addButtons.forEach( e => e.addEventListener('click', renderFoodForm))

Food.getFoods()
Meal.getMeals()

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
  Food.createOptions()
  newFoodForm.addEventListener('submit', submitHandler)
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

  const currentRow = this.parentElement.parentElement
  let mealName = getMealName(currentRow).id
      //Ajax 
  Meal.editMeal(foodID, quantity, mealName)

  newRow.innerHTML = `<td>${foodName} - ${quantity} grams</td>`
  newRow.dataset.id = foodID
  document.querySelector('tbody').insertBefore(newRow, getMealName(currentRow).nextElementSibling)
  this.previousElementSibling.style.visibility = ''
  this.remove()
}

