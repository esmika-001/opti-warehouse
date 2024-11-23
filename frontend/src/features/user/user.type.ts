export type loginApiPayload = {
  email: string,
  password: string,
}

export type loginVerifyApiPayload = {
  email: string,
  otp: string,
}

export type InitUser = {
  uuid: string,
  name: string,
  email: string,
  status: string,
  username: string,
  pincode: number,
  state: string,
  city: string,
  street: string,
  country: string,
  image: string,
  phone_no: string,
  created_at: string,
  updated_at: string,
  deleted_at: string,
}

export type loginApiResponse = {
  response: {
    status: number
  }
  data: InitUser
  token: string
}
export type initialState = {
  token: string,
  error: boolean,
  user: InitUser,
  allUsers: InitUser[] | null,
  isLoading: false | true,
  isLogedin: false | true
}
