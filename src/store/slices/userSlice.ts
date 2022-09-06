import { createSlice } from "@reduxjs/toolkit"
// import axios from "axios"
// import { RootState } from ".."
import { IUser } from "../../types"

// const url = process.env.REACT_APP_DB_URL

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

// export const setUser = createAsyncThunk<IUser, IUser, { state: RootState }>(
// 	"user/setUser",
// 	async (user) => {
// 		const response = await axios.put(`${url}/users/${user.id}.json`, JSON.stringify(user))

// 		if (response.statusText !== "OK") throw new Error("Server Error")

// 		return response.data
// 	}
// )

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
			state.error = null
		},
		setError(state, action) {
			state.error = action.payload.error
			state.loading = false
		},
		removeUser(state) {
			state.user.email = null
			state.user.id = null
			state.user.token = null
			state.error = null
		},
	},
	// extraReducers(builder) {
	// 	builder.addCase(setUser.fulfilled, (state, action) => {
	// 		state.loading = false
	// 		state.user = action.payload
	// 		state.error = null
	// 	})
	// },
})

export const { showLoader, addUser, setError, removeUser } = userSlice.actions
export default userSlice.reducer
