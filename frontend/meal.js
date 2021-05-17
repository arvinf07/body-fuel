
class Meal {
  static all = []

  constructor(json){
    const {name, id} = json
    this.mealFoods = []
    //should this be moved to its own static function
    if (json.meal_foods.length != 0){
      json.meal_foods.forEach( e => {
        let food = Food.findByID(e.food_id)
        let foodAmount = e.amount
        let mealFoodID = e.id
        this.addFood(food, foodAmount, mealFoodID) // Move to 
      })
    }
    this.name = name
    this.id = id
    Meal.all.push(this)
  }

  static displayMeals(json){
    json.forEach(meal => {
      let mealObj = new Meal(meal)
      mealObj.displayMeal()
    })
    Array.from(foodRows).forEach(row => addDeleteBtn(row) )
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
    .then(json => console.log(json))
    .catch( error => alert(error))
  }

  displayMeal(){
    let mealRow = document.getElementById(this.name.toLowerCase())
    if (this.mealFoods.length != 0){
      this.mealFoods.forEach(meal_food => {
        const newFoodTr = document.createElement('tr')
        newFoodTr.innerHTML = `
        <td data-food-id=${meal_food.food.id} data-meal-food-id=${meal_food.id}> ${meal_food.food.name}
        <br>${meal_food.foodAmount} grams - ${meal_food.food.displayCalories(meal_food.foodAmount)} calories</td>
        `
        mealRow.insertAdjacentElement('afterend', newFoodTr)    
        newFoodTr.classList += 'food-row'    
      })
    }
  }

  addFood(food, foodAmount, mealFoodID){
    let newFood = {food: food, foodAmount: foodAmount, id: mealFoodID}
    this.mealFoods.push(newFood)
  }
  
}