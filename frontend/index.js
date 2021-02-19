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

function createDropDown(){
  Food.all.forEach( food => {
    let option = document.createElement('option')
    option.value = food.name
    option.innerText = food.name
    document.getElementById('food').appendChild(option)
  })
}

//Button does not reappear after foodlogging


function submitHandler(e){
  //Optimistic approach.
  e.preventDefault()
  let food = this.querySelector('select').value
  let quantity = this.querySelector('input').value
  let newRow = document.createElement('tr')
  newRow.innerHTML = `<td>${food} - ${quantity} grams</td>`
  document.querySelector('tbody').insertBefore(newRow, this.closest('tr'))
  this.previousElementSibling.style.visibility = ''
  this.remove()
}
