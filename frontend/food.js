class Food{
  static all = []

  constructor({name, cal, fat, carb, protein, id}){
    this.name = name
    this.cal = cal
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
  
  static getFoods(){
    fetch('http://127.0.0.1:3000/foods')
    .then(resp => resp.json())
    .then( json => Food.makeFood(json) )
    .catch(error => console.log('this went wrong', error))
  }
  
  static makeFood(json){
    json.forEach( food => new Food(food))
  }

  static findByID(id){
    return Food.all.find(element => element.id === id )
  }

  rightAmount(amount){
    // calculate the ratio given the amount
    // return an object with all the macros and the values
  }

}