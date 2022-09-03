import { createSlice } from "@reduxjs/toolkit"
import { IUser } from "../../types"

interface IState {
	loading: boolean
	user: IUser
	error: string | null
}

const initialState: IState = {
	loading: false,
	user: {
		id: null,
		token: null,
		email: null,
	},
	error: null,
}

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		showLoader(state) {
			state.loading = true
		},
		addUser(state, action) {
			state.loading = false
			state.user = action.payload.user
		},
		setError(state, action) {
			state.error = action.payload.error
		},
		removeUser(state) {
			state.user.email = null
			state.user.id = null
			state.user.token = null
			state.error = null
		},
	},
})

export const { addUser, showLoader, setError, removeUser } = userSlice.actions
export default userSlice.reducer
