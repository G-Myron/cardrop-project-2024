import { Categories } from "../models/category.js"

export class DetailsController {

  static async getCategoryDetails(categoryName, daysCount) {
    const category = await Categories.getCategory(categoryName, daysCount)

    return category
  }

  static async getAcceptableCategories() {
    return await Categories.getAllCategories()
  }

  static getDays(dateFrom, dateTo) {
    const diff = new Date(dateTo) - new Date(dateFrom)
    return diff / ( 24 * 60 * 60e3 )
  }

}
