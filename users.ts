export interface User {
  email: string,
  id: {
    value: string
  },
  name: {
    title: string,
    first: string,
    last: string
  },
  gender: 'male' | 'female',
  location: {
    country: string
  },
  picture: {
    large: string,
    medium: string,
    thumbnail: string
  },
  login: {
    username: string
  }
}
