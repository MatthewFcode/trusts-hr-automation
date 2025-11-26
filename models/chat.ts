export interface Chat {
  message: string
  time_sent: string
  message_auth0Id: string
  username: string
  profile_photo: string
}

export interface ChatCamel {
  message: string
  timeSent: string
  messageAuth0Id: string
  username: string
  profilePhoto: string
}

export interface ClientChatFunction {
  token: string
}

export interface ClientPostFunctionObject {
  message: string
}
