class Food{
  static all = []

  //is this Destructuring??
  constructor({name, cal, fat, carb, protein}){
    this.name = name
    this.cal = cal
    this.fat = fat
    this.carb = carb
    this.protein = protein
    Food.all.push(this)
  }

  rightAmount(amount){
    
  }

}