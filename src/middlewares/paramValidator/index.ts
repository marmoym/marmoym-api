import * as logger from '@src/modules/logger';
import * as ApiURL from '@models/ApiURL';
import validate from './validate';

export default function paramValidator(req, res, next) {
    const param = validate(req);
    req.$param = param;
    next();
};
