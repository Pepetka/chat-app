export interface IMessage {
	email: string
	date: string
	message: string
}

export interface IUser {
	id: string | null
	token: string | null
	email: string | null
}
