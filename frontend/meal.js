
class Meal {
  static all = []

  constructor(json){
    const {name, id, meal_foods} = json
    this.mealFoods = []

    if (meal_foods.length != 0){
      meal_foods.forEach(mealFood => this.createMealFood(mealFood))
    }

    this.name = name
    this.id = id
    Meal.all.push(this)
  }

  createMealFood(mealFood){
    //creates and returns js object from json data
    let food = Food.findByID(mealFood.food_id)
    let foodAmount = mealFood.amount         
    let mealFoodID = mealFood.id
    return this.addMealFood(food, foodAmount, mealFoodID)
  }

  static displayMeals(json){
    json.forEach(meal => {
      let mealObj = new Meal(meal)
      if (mealObj.mealFoods.length != 0){
        mealObj.mealFoods.forEach( meal_food => mealObj.displayMealFood(meal_food))
      }
    })
  }

  //display one mealFood at a time
  displayMealFood(meal_food) {
    let mealRow = document.getElementById(this.name.toLowerCase())
    const newFoodTr = document.createElement('tr')

    displayMacros(meal_food, newFoodTr)
    mealRow.insertAdjacentElement('afterend', newFoodTr)    
    newFoodTr.classList += 'food-row'    
    addDeleteBtn(newFoodTr)
  }

  static findByName(name){
    return Meal.all.find(element => element.name.toLowerCase() === name )
  }

  static getMeals(){
    fetch(`http://127.0.0.1:3000/meals`)
    .then(resp => resp.json())
    .then( json => Meal.displayMeals(json) )
    .catch(error => console.log('this went wrong', error))
  }

  editMeal(foodId, foodAmount){
    const body = {meal: {name: this.name, meal_foods_attributes: {food_id: foodId, amount: foodAmount}}}
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }; 

    fetch(`http://127.0.0.1:3000/meals/${this.id}`, configObject)
    .then(resp => resp.json())
    .then(({meal_foods}) => {
      let lastMealFood = meal_foods[meal_foods.length - 1]
      this.displayMealFood(this.createMealFood(lastMealFood))
    })
    .catch( error => console.log(error))
  }

  addMealFood(food, foodAmount, mealFoodID){
    let newFood = {food: food, foodAmount: foodAmount, id: mealFoodID}
    this.mealFoods.push(newFood)
    return newFood
  }

}