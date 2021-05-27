
class Meal {
  static all = []

  constructor(json){
    const {name, id, meal_foods} = json
    this.mealFoods = []
    // refactor 
    if (meal_foods.length != 0){
      meal_foods.forEach(mealFood => this.createMealFood(mealFood))
    }

    this.name = name
    this.id = id
    Meal.all.push(this)
  }

  createMealFood(mealFood){
    //creates and returns new js object from json data
    let food = Food.findByID(mealFood.food_id)
    let {amount, id} = mealFood
    return this.addMealFood(food, amount, id)
  }

  static findByName(name){
    return Meal.all.find(element => element.name.toLowerCase() === name )
  }

  static getMeals(){
    fetch(`http://127.0.0.1:3000/meals`)
    .then(resp => resp.json())
    .then( json => displayMeals(json) )
    .catch(error => console.log('this went wrong', error))
  }

  editMeal(foodId, foodAmount, currentRow){
    const body = {meal: {name: this.name, meal_foods_attributes: {food_id: foodId, amount: foodAmount}}}
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }; 
    console.log(currentRow)

    fetch(`http://127.0.0.1:3000/meals/${this.id}`, configObject)
    .then(resp => resp.json())
    .then( meal_food => {
      displayMealFood(this.createMealFood(meal_food), this.name, currentRow)
    })
    .catch( error => console.log(error))
  }

  addMealFood(food, foodAmount, mealFoodID){
    let newFood = {food: food, foodAmount: foodAmount, id: mealFoodID}
    this.mealFoods.push(newFood)
    return newFood
  }

}