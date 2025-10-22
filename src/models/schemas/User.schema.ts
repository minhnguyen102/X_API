import { ObjectId } from "mongodb"
enum UserVerifyStatus {
  Unverified,
  Verified,
  Banner
}

interface UserType {
  _id: ObjectId
  name: string
  email: string
  password: string
  date_of_birth: string
  createdAt: Date
  updatedAt: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus

  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string
}

export default class User {
  _id: ObjectId
  name: string
  email: string
  password: string
  date_of_birth: string
  createdAt: Date
  updatedAt: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus

  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string

  constructor(user: UserType) {
    this._id = user._id
    this.email = user.email
    this.name = user.name
    this.password = user.password
    this.date_of_birth = user.date_of_birth
    this.createdAt = user.createdAt
    this.updatedAt = user.updatedAt
    this.email_verify_token = user.email_verify_token
    this.forgot_password_token = user.forgot_password_token
    this.verify = user.verify
    this.bio = user.bio
    this.location = user.location
    this.website = user.website
    this.username = user.username
    this.avatar = user.avatar
    this.cover_photo = user.cover_photo
  }
}
