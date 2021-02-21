// constructor should accept meal_foods in array
// map over and convert them food objects

class Meal {
  constructor({name, food, foodAmount}){
    this.name = name
    this.mealFoods = [{food: food, foodAmount: foodAmount}]
    debugger
  }
  
  addFood(food, foodAmount){
    let newFood = {food: food, foodAmount: foodAmount}
    this.mealFoods.push(newFood)
  }
}