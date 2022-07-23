/* eslint-disable */

import axios from 'axios'
import { CURRENT_URL } from '../../utils';

class Api {
  static async headers() {
    return {
      'Content-Type': 'application/json',
      mode: 'no-cors',
      Accept: '*/*',
      'Access-Control-Allow-Origin': '*',
      // 'x-auth-token': localStorage.getItem('token'),
      //"files" : 
    };
  }

  static async headersMultiForm() {
    return {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
    };
  }

  static get(route: string) {
    return this.xhr(route, null, 'GET');
  }

  static put(route: string, params: any) {
    return this.xhr(route, params, 'PUT');
  }

  static patch(route: string, params: any) {
    return this.xhr(route, params, 'PATCH');
  }

  static post(route: string, params: any) {
    return this.xhr(route, params, 'POST');
  }

  static delete(route: string) {
    return this.xhr(route, null, 'DELETE');
  }

  static putMultiForm(route: string, parama: any) {
    return this.xhrMultiForm(route, parama, 'PUT');
  }

  static postMultiForm(route: string, parama: any) {
    return this.xhrMultiForm(route, parama, 'POST');
  }

  static async xhrMultiForm(route: any, params: any, verb: any) {
    const host = 'https://covid19.mathdro.id/api';
    const url = `${host}${route}`;
    let options = Object.assign({ method: verb }, params ? { body: params } : null);
    // options.headers = await Api.headersMultiForm();
    const optionHeaders = {
      ...options,
      headers: await Api.headersMultiForm()
    }
    return axios(url, optionHeaders)
      .then((resp) => {
        return resp;
      });
  }

  static async xhr(route: any, params: any, verb: any) {
    const url = `${CURRENT_URL}${route}`;
    const options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null
    );
    const optionH = {
      ...options,
      headers: await Api.headers()
    }
    return axios(url, optionH)
      .then((resp) => {
        console.log('resp', resp)
        return resp
      });
  }
}
export default Api;