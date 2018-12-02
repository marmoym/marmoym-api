import LaunchStatus from '@constants/LaunchStatus';
import { stateLog } from '@modules/Log';

const state: State = {
  launchStatus: LaunchStatus.NOT_YET_INTIALIZED,
  update(obj = {}) {
    stateLog.info('state will update with: %o', obj);
    for (let key in this) {
      if (obj[key]) {
        this[key] = obj[key];
      }
    }
  },
};

export default state;

export interface State {
  launchStatus: string,
  update: (obj: {}) => void,
}
