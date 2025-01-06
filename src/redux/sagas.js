import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

// API call to fetch users
function* fetchUsersSaga() {
  try {
    const response = yield call(fetch, 'https://randomuser.me/api/?results=100');
    const data = yield response.json();
    yield put({ type: 'users/fetchUsersSuccess', payload: data.results });
  } catch (error) {
    yield put({ type: 'users/fetchUsersFailure', payload: error.message });
  }
}

// Watcher saga
function* watchFetchUsers() {
  yield takeLatest('users/fetchUsers', fetchUsersSaga);
}

// Root saga
export default function* rootSaga() {
  yield watchFetchUsers();
}
