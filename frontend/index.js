const addButtons = document.querySelectorAll('button')

addButtons.forEach( e => e.addEventListener('click', renderFoodForm))

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
  newFoodForm.innerHTML = 
  `<label>Food Name</label>
   <select name="cars" id="cars">
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
   </select>
  `
    
}