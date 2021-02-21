// constructor should accept meal_foods in array
// map over and convert them food objects

class Meal {
  static all = []

  constructor(json){
    const {name, id} = json
    this.mealFoods = []
    if (json.meal_foods.length != 0){
      debugger
      this.addFood(foodObj)
    }
    this.name = name
    this.id = id
    Meal.all.push(this)
  }

  static findByName(name){
    return Meal.all.find(element => element.name.toLowerCase() === name )
  }
  
  addFood(food, foodAmount){
    let newFood = {food: food, foodAmount: foodAmount}
    this.mealFoods.push(newFood)
  }
}