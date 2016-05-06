import ApiRoutes from '../../../shared/routes/api';
import { CALL_API, Schemas } from '../middleware/api';
import { auth } from './CurrentUserActions';

export const APP_STATS_REQUEST = 'APP_STATS_REQUEST';
export const APP_STATS_SUCCESS = 'APP_STATS_SUCCESS';
export const APP_STATS_FAILURE = 'APP_STATS_FAILURE';

const UPDATE_INTERVAL = 3600 * 1000; // 1 hour

function fetchAppStats() {
  const endpoint = ApiRoutes.appStats();

  return {
    [CALL_API]: {
      endpoint,
      schema: Schemas.NONE,
      types: [ APP_STATS_REQUEST, APP_STATS_SUCCESS, APP_STATS_FAILURE ],
      opts: auth,
    },
    updatedAt: (new Date()).valueOf(),
  };
}

function shouldFetchAppStats(state) {
  const { data: { usersCount }, isFetching, updatedAt } = state.appStats;
  const now = (new Date()).valueOf();

  return (!isFetching &&
          (typeof usersCount === 'undefined' || !updatedAt || now - updatedAt > UPDATE_INTERVAL));
}

export function getAppStatsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAppStats(getState())) {
      return dispatch(fetchAppStats());
    }
  };
}
