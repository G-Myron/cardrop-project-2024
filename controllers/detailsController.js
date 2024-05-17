import { Categories } from "../models/category.js"

export class DetailsController {

  static async getCategoryDetails(categoryName) {
    const category = await Categories.getCategory(categoryName)

    return category
  }

  static async getDays(dateFrom, dateTo) {
    const diff = new Date(dateTo) - new Date(dateFrom)
    return diff / ( 24 * 60 * 60e3 )
  }

}
