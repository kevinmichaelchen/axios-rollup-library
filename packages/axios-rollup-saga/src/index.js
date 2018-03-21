import { get } from '../../axios-rollup-library/src';
import { call } from 'redux-saga/effects';

export function* axiosSaga() {
  console.log('Starting saga to fetch current user profile');
  const { response, error } = yield call(get);
  if (response) {
    console.log('RESPONSE =', response);
  } else {
    console.log('ERROR =', error);
  }
}
