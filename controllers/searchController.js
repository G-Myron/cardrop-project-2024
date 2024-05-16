import { Cars } from "../models/car.js"
import { Categories } from "../models/category.js"

export class SearchController {

  static async getAvailiableCategories(city) {
    const categories = await Categories.getAllCategories(city)

    const availiable = []
    for (let category of categories) {
      if ( await Cars.countCarsOfCategoryInLocation(category.name, city) )
        availiable.push(category)
    }
    
    return availiable
  }
}
