class Food{
  static all = []

  constructor({name, calories, fat, carb, protein, id}){
    this.name = name
    this.calories = calories
    this.fat = fat
    this.carb = carb
    this.protein = protein
    this.id = id
    Food.all.push(this)
  }

  static createOptions(){
    Food.all.forEach( food => {
      let option = document.createElement('option')
      option.value = food.id
      option.innerText = food.name
      document.getElementById('food').appendChild(option)
    })
  }

  // Move to meal class or food IDK
  static handleDelete(e){
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
  
  static getFoods(){
    fetch('http://127.0.0.1:3000/foods')
    .then(resp => resp.json())
    .then( json => {
      Food.makeFood(json)} )
    .catch(error => console.log('this went wrong', error))
  }
  
  static makeFood(json){
    json.forEach( food => new Food(food))
  }

  static findByID(id){
    return Food.all.find(element => element.id === id )
  }

  displayCalories(amount){
    let base = this.calories/100
    return Math.round(base * amount)
  }

}