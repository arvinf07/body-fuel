const addButtons = document.querySelectorAll('button')
const foodTable = document.getElementById('food-table')

addButtons.forEach( e => e.addEventListener('click', renderFoodForm))

getFoods()
getMeals()

function getFoods(){
  fetch('http://127.0.0.1:3000/foods')
  .then(resp => resp.json())
  .then( json => Food.makeFood(json) )
  .catch(error => console.log('this went wrong', error))
}

function getMeals(){
  fetch(`http://127.0.0.1:3000/meals`)
  .then(resp => resp.json())
  .then( json => Meal.displayMeals(json) )
  .catch(error => console.log('this went wrong', error))
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

function getMealName(row) {
  let previous = row.previousSibling;
  while (!previous.classList.contains('meals')) {
    previous = previous.previousSibling;
  }
  return previous.id;
}

function submitHandler(e){
  //Optimistic approach.
  e.preventDefault()
  let foodID = this.querySelector('select').value
  let foodName = this.querySelector('select').querySelector(`option[value="${foodID}"]`).innerText
  let quantity = this.querySelector('input').value
  let newRow = document.createElement('tr')

  const currentRow = this.parentElement.parentElement
  let mealName = getMealName(currentRow)
      //Ajax 
  Meal.editMeal(foodID, quantity, mealName)

  newRow.innerHTML = `<td>${foodName} - ${quantity} grams</td>`
  newRow.dataset.id = foodID
  document.querySelector('tbody').insertBefore(newRow, this.closest('tr'))
  this.previousElementSibling.style.visibility = ''
  this.remove()
}

// function editMeal(foodId, foodAmount, mealName){
//   const body = {meal: {name: mealName, meal_foods_attributes: {food_id: foodId, amount: foodAmount}}}
//   const configObject = {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//       "Accept": "application/json"
//     },
//     body: JSON.stringify(body)
//   }; 


//   fetch(`http://127.0.0.1:3000/meals/${Meal.findByName(mealName).id}`, configObject)
//   .then(resp => resp.json())
//   .then(json => console.log(json))
//   .catch( error => alert(error))
// }
