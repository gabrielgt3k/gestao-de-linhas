import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import history from '../../../services/history';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, senha } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      senha,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/home');
  } catch (error) {
    toast.error('Falha na autenticação, verifique seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
