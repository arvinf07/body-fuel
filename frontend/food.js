class Food{
  static all = []

  constructor(props){
    Object.assign(this, props)
    Food.all.push(this)
  }

  static handleDelete(e){
    // should I make a mealFood.js ?
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

  createMacros(amount){
    let macroObj = {"calories": 0, "protein": 0, "fat": 0, "carb": 0}
    for (let prop in macroObj){
      let base = this[prop]/100
      macroObj[prop] = Math.round(base * amount)
    }
    return macroObj
  }

}
