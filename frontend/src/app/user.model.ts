interface UserModel {
  id: string,
  name: string,
  nickname: string,
  password: string,
  lastDraw: Date,
  agreedFeedback: Array<string>
}
