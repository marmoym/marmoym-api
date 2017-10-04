import db from '../../database';

export const getDefinitions = () => {
  return db('Definition').select()
    .then(res => res)
};

export const getDefinitionsByTermId = (termId: number) => {
  return db('Definition').where({
    term_id: termId
  }).select()
};