import token from '@@externalModules/token';

import marmoymConfig from '@@config/marmoymConfig';

const Token = new token({
  privateKey: marmoymConfig.auth.privateKey,
  tokenDuration: marmoymConfig.auth.tokenDuration,
});

export default Token;
