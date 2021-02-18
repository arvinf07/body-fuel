const addButtons = document.querySelectorAll('button')

addButtons.forEach( e => e.addEventListener('click', renderFoodForm))

function getFoods(){
  fetch('http://127.0.0.1:3000/foods')
  .then(resp => resp.json())
  .then( json => console.log(json))
}

function renderFoodForm(){
  this.style.visibility = 'hidden'
  let newFoodForm = document.createElement('form')
  newFoodForm.innerHTML = 
  `<label
  `
    
}