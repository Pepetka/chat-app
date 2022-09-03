import { createSlice } from "@reduxjs/toolkit"
import { IMessage } from "../../types"

interface IMessageState {
	messages: IMessage[]
	loading: boolean
	error: string | null
}

const initialState: IMessageState = {
	messages: [],
	loading: true,
	error: null,
}

const messageSlice = createSlice({
	name: "message",
	initialState,
	reducers: {
		setMessages(state, action) {
			state.loading = false
			state.messages = action.payload.messages
		},
	},
})

export const { setMessages } = messageSlice.actions
export default messageSlice.reducer
