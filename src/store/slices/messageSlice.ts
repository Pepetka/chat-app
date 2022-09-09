import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."
import { IChat, IMessage } from "../../types"
import { v4 as uuid } from "uuid"

const url = process.env.REACT_APP_DB_URL

interface IMessageState {
	messages: IMessage[]
	loading: boolean
	error: string | null
	currentChat: ICurrentChat
}

interface ICurrentChat {
	id: string
	chatName: string
}

const initialState: IMessageState = {
	messages: [],
	loading: true,
	error: null,
	currentChat: {
		id: "general",
		chatName: "General chat",
	},
}

export const changeChat = createAsyncThunk<
	ICurrentChat,
	string,
	{ state: RootState; rejectValue: string }
>("message/changeChat", async (id, { rejectWithValue, getState }) => {
	try {
		const { users } = getState().usersList
		const { user } = getState().user

		const chat: IChat = users
			.filter((user) => user.id === id)[0]
			.chats?.filter((chat) => chat.email === user.email)[0]

		if (!chat) {
			const chatId = uuid()
			const userItem = users.filter((el) => el.id === user.id)[0]
			const userItemFriend = users.filter((el) => el.id === id)[0]
			const userChats = userItem.chats
				? [...userItem.chats, { email: userItemFriend.email, chatId }]
				: [{ email: userItemFriend.email, chatId }]
			const userFriendChats = userItemFriend.chats
				? [...userItemFriend.chats, { email: userItem.email, chatId }]
				: [{ email: userItem.email, chatId }]

			const responseUser = await axios.put(`${url}/users/${user.id}.json`, {
				...userItem,
				chats: userChats,
			})
			if (responseUser.statusText !== "OK") throw new Error("Server Error")

			const responseFriend = await axios.put(`${url}/users/${id}.json`, {
				...userItemFriend,
				chats: userFriendChats,
			})
			if (responseFriend.statusText !== "OK") throw new Error("Server Error")

			return { id: chatId, chatName: userItemFriend.email! }
		} else {
			return {
				id: (chat as IChat).chatId,
				chatName: users.filter((user) => user.id === id)[0].email!,
			}
		}
	} catch (error) {
		return rejectWithValue((error as Error).message)
	}
})

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		setMessages(state, action) {
			state.loading = false
			state.messages = action.payload.messages
		},
		setError(state, action) {
			state.loading = false
			state.error = action.payload.error
		},
		setChat(state) {
			state.currentChat.id = "general"
			state.currentChat.chatName = "General chat"
		},
		setNewChat(state, action) {
			state.currentChat.id = action.payload.id
			state.currentChat.chatName = action.payload.chatName
		},
	},
	extraReducers(builder) {
		builder
			.addCase(changeChat.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(changeChat.fulfilled, (state, action) => {
				state.loading = false
				state.currentChat.id = action.payload.id
				state.currentChat.chatName = action.payload.chatName
				state.error = null
			})
			.addCase(changeChat.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload!
			})
	},
})

export const { setMessages, setError, setChat, setNewChat } = messageSlice.actions
export default messageSlice.reducer
