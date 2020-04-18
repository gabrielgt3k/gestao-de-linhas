import { takeLatest, all, call, put } from 'redux-saga/effects';

export function signIn({ payload }) {
  const { email, senha } = payload;
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
