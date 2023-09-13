import { ProductMediaModel } from './product-media.model'

const ProductMediaService = {
  /**
   * Get all product-medias
   * @returns
   */
  async all() {},

  /**
   * Find one product-media by id
   * @param id
   * @returns
   */
  findOne() {
    return new ProductMediaModel()
  },

  /**
   * Create a new product-media
   * @param productMedia
   * @returns
   */
  create() {
    return new ProductMediaModel()
  },

  /**
   * Update a product-media
   * @param id
   * @param productMedia
   * @returns
   */
  update() {
    return new ProductMediaModel()
  },

  /**
   * Delete a product-media
   * @param id
   * @returns
   */
  delete() {
    return true
  },
}

export default ProductMediaService
