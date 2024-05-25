import { Cars } from "../models/car.js"
import { Categories } from "../models/category.js"

export class SearchController {

  static async getAvailableCategories(city, daysCount) {
    const categories = await Categories.getAllCategories(daysCount)

    const available = []
    for (let category of categories) {
      category.availability = await Cars.countCarsOfCategoryInLocation(category.name, city)
      if (category.availability)
        available.push(category)
    }
    
    return available
  }

  static getDays(dateFrom, dateTo) {
    const diff = new Date(dateTo) - new Date(dateFrom)
    return diff / ( 24 * 60 * 60e3 )
  }
}
