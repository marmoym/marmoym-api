/**
 * Copyright Marmoym 2017
 */

import models from '../models'

/**
 * ...
 */
class ModelService {

  public init() {
    return models['sequelize'].sync();
  }

}

export default new ModelService;