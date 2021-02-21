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
    debugger
    return Food.all.find(element => element.id === id )
  }

  rightAmount(amount){
    
  }

}