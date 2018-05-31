import pageNation, { rootCom } from './pageNation';

const navState = pageNation.router.getStateForAction(pageNation.router.getActionForPathAndParams(rootCom));
const navReducer = (state = navState, action) => {
  const nextState = pageNation.router.getStateForAction(action, state);
  return nextState || state;
};

export default navReducer;