export interface User {
  auth0Id: string
  username: string
  position: string
  profile_photo: string
}

export interface UserSnake {
  auth0Id: string
  username: string
  position: string
  profilePhoto: string
}

export interface UserActivity {
  username: string
  position: string
  last_active: string
  profile_photo: string
}

export interface UserActivitySnake {
  username: string
  position: string
  lastActive: string
  profilePhoto: string
}

export interface GetUserFunction {
  token: string
}

export interface AddUserFunction {
  token: string
  formData: FormData
}

export interface UpdateUserFunction {
  token: string
  formData: FormData
}

export interface DeleteUserFunction {
  token: string
}
