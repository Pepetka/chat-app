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

export interface IUserItem {
	id: string | null
	email: string | null
	chats: IChat[]
}

export interface IChat {
	email: string
	chatId: string
}
