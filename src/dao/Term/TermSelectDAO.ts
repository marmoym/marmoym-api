import db from '../../database';

export const getTermByLabel = (label: string) => {
  return db('Term').select()
    .where({
      label: label
    });
};