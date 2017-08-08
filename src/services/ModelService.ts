/**
 * Copyright Marmoym 2017
 */
import models from '../models/db'

/**
 * ...
 */
export const initializeDB = () => {
  return models['sequelize'].sync();
}