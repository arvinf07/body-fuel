// constructor should accept meal_foods in array
// map over and convert them food objects

class Meal {
  static all = []

  constructor(json){
    const {name, id} = json
    this.mealFoods = []
    if (json.meal_foods.length != 0){
      json.meal_foods.forEach( e => {
        let food = Food.findByID(e.food_id).name
        let foodAmount = e.amount
        let mealFoodID = e.id
        this.addFood(food, foodAmount, mealFoodID)
      })
    }
    this.name = name
    this.id = id
    Meal.all.push(this)
  }

  static editMeal(foodId, foodAmount, mealName){
    const body = {meal: {name: mealName, meal_foods_attributes: {food_id: foodId, amount: foodAmount}}}
    const configObject = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(body)
    }; 
  
  
    fetch(`http://127.0.0.1:3000/meals/${Meal.findByName(mealName).id}`, configObject)
    .then(resp => resp.json())
    .then(json => console.log(json))
    .catch( error => alert(error))
  }

  static displayMeals(json){
    json.forEach(meal => {
      new Meal(meal)
      let mealRow = document.getElementById(meal.name.toLowerCase())
      if (meal.meal_foods.length != 0){
        meal.meal_foods.forEach(meal_food => {
          const newFoodTr = document.createElement('tr')
          newFoodTr.innerHTML = `
          <td data-food-id=${meal_food.food_id}> ${Food.findByID(meal_food.food_id).name} - ${meal_food.amount} grams</td>
          `
          mealRow.insertAdjacentElement('afterend', newFoodTr)        
        })
      }
    })
  }

  static findByName(name){
    return Meal.all.find(element => element.name.toLowerCase() === name )
  }
  
  addFood(food, foodAmount, mealFoodID){
    let newFood = {food: food, foodAmount: foodAmount, id: mealFoodID}
    this.mealFoods.push(newFood)
  }
}