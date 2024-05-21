import { Cars } from "../models/car.js"
import { Categories } from "../models/category.js"

export class SearchController {

  static async getAvailiableCategories(city, daysCount) {
    const categories = await Categories.getAllCategories(daysCount)

    const availiable = []
    for (let category of categories) {
      category.availiability = await Cars.countCarsOfCategoryInLocation(category.name, city)
      if (category.availiability)
        availiable.push(category)
    }
    
    return availiable
  }

  static getDays(dateFrom, dateTo) {
    const diff = new Date(dateTo) - new Date(dateFrom)
    return diff / ( 24 * 60 * 60e3 )
  }
}
