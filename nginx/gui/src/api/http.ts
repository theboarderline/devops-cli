import { api } from './axios';
import { fixURI, getError } from '../utils';


const getData = (url: string): Promise<any> => {
  return api()
    .get(fixURI(url))
    .then((response) => {
      if (response?.status === 200) {
        return response?.data;
      }

      return getError(response?.data);
    })
    .catch(({ response }) => {
      return response;
    });
};


const postData = (url: string, data: any): Promise<any> => {
  data.append('credentials', 'same-origin');

  return api()
    .post(fixURI(url), data)
    .then((response) => {
      if (response?.status === 201 || response?.status === 200) {
        setTimeout(() => console.log('Success:', response), 2000);
        return response;
      }
      throw Error(response?.statusText);
    })
    .catch(({ response }) => {
      return response;
    });
};


const putData = (url: string, data: any): Promise<any> => {
  return api()
    .put(fixURI(url), data)
    .then((response) => {
      if (response?.status === 200) {
        return response?.data;
      }

      throw Error(response?.statusText);
    })
    .catch(({ response }) => {
      return response;
    });
};


const patchData = (url: string, data: any): Promise<void> => {
  return api()
    .patch(fixURI(url), data)
    .then((response) => {
      if (response?.status === 200) {
        return response?.data;
      }

      throw Error(response?.statusText);
    })
    .catch(({ response }) => {
      return response;
    });
};


const deleteData = (url: string): Promise<void> => {
  return api()
    .delete(fixURI(url))
    .then((response) => {
      if (response?.status === 204) {
        return response;
      }

      throw Error(response?.statusText);
    })
    .catch(({ response }) => {
      return response;
    });
};


export { getData, postData, putData, patchData, deleteData };
