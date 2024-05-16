import { Cars } from "../models/car.js"
import { Categories } from "../models/category.js"

export class SearchController {

  static async getAvailiableCategories(dateFrom, dateTo) {
    const categories = await Categories.getAllCategories()

    const availiable = []
    for (let category of categories) {
      if ( await Cars.countCarsOfCategory(category.name) )
        availiable.push(category)
    }
    
    return availiable
  }
}
