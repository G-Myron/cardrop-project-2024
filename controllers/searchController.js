import { Cars } from "../models/car.js"
import { Categories } from "../models/category.js"

export class SearchController {

  static async getAvailiableCategories() {
    const categories = await Categories.getAllCategories()

    const availiable = await Promise.all(categories.map(
      async cat => await Cars.countCarsOfCategory(cat.name)? cat.name:null
    ))
    
    return availiable.filter( value=>value )
  }
}
