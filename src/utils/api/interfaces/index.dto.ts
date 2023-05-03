export interface IUser {
  currentUser: null | [];
  isFetching: boolean;
  error: boolean;
}

export interface SingleUser {
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
  };
  name: { title: string; first: string; last: string };
  location: {
    city: string;
    coordinates: { latitude: string; longitude: string };
    country: string;
    postcode: number;
    state: string;
  };
  email: string;
  phone: string;
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  dob: { date: Date; age: number };
  
}
