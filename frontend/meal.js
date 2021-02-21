// constructor should accept meal_foods in array
// map over and convert them food objects

class Meal {
  static all = []

  constructor({name, food, foodAmount, id}){
    this.name = name
    this.mealFoods = [{food: food, foodAmount: foodAmount}]
    this.id = id
    Meal.all.push(this)
  }
  
  addFood(food, foodAmount){
    let newFood = {food: food, foodAmount: foodAmount}
    this.mealFoods.push(newFood)
  }
}