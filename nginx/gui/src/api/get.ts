import { getData, postData } from './http';
import { Deal, DealType, House, Member, Question, State, Testimonial, User } from './types';


export const getCurrentUser = async (): Promise<User> => {
  return getData('check/')
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results[0];
    })
    .catch(({ response }) => {
      return response;
    });
}

export const getUser = async (username: string): Promise<User> => {
  return getData(`users/?username=${username}`)
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results[0];
    })
    .catch(({ response }) => {
      return response;
    });
}

export const getStates = async (): Promise<State[]> => {
  return getData('states/')
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results;
    })
    .catch(({ response }) => {
      return response;
    });
}


export const getTestimonials = async (): Promise<Testimonial[]> => {
  return getData('testimonials/')
    .then((data: Testimonial[]) => {
      return data;
    })
    .catch(({ response }) => {
      return response;
    });
}


export const getDeals = async (): Promise<Deal[]> => {
  return getData('deals/')
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results;
    })
    .catch(({ response }) => {
      return response;
    });
}


export const getHouses = async (): Promise<House[]> => {
  return getData('houses/')
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results;
    })
    .catch(({ response }) => {
      return response;
    });
}


export const getMembers = async (): Promise<Member[]> => {
  return getData('members/')
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results;
    })
    .catch(({ response }) => {
      return response;
    });
}


export const getSellers = async (): Promise<Member[]> => {
  return getData('members/?is_seller=true')
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results;
    })
    .catch(({ response }) => {
      return response;
    });
}


export const getBuyers = async (): Promise<Member[]> => {
  return getData('members/?is_buyer=true')
    .then(({ results }) => {
      if (!results?.length) throw Error(results)
      return results;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}


export const getDealTypes = async (): Promise<DealType[]> => {
  return getData('dealtypes/')
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}


export const getQuestions = async (): Promise<Question[]> => {
  return getData('questions/')
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
}