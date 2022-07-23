import { patchData } from './http';


export const patchNames = async (firstname: string, lastname: string): Promise<void> => {
  const formData = new FormData();
  formData.append('first_name', firstname);
  formData.append('last_name', lastname);

  return patchData('auth/user/', formData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};


export const patchSomethingElse = async (): Promise<void> => {
  const formData = new FormData();

  return patchData('', formData)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};