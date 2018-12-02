import ApiResult from '@models/ApiResult';

const definitionService = {
  async addDefinition(param: {
    definition: string;
    label: string;
  }) {
    console.log(123, param.definition, param.label);
    return new ApiResult({});
  },
};

export default definitionService;
