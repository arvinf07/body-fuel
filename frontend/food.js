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

  static findByID(id){
    return Food.all.find(element => element.id === id )
  }

  rightAmount(amount){
    // calculate the ratio given the amount
    // return an object with all the macros and the values
  }

}