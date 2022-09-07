import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { IUser, IUserItem } from "../../types"

const url = process.env.REACT_APP_DB_URL

interface IState {
	loading: boolean
	user: IUser
	error: string | null
	usersList: IUser[]
}

const initialState: IState = {
	loading: false,
	user: {
		id: null,
		token: null,
		email: null,
	},
	usersList: [],
	error: null,
}

export const setUser = createAsyncThunk<any, IUser, { rejectValue: string }>(
	"user/setUser",
	async (user, { rejectWithValue }) => {
		try {
			const userItem: IUserItem = { id: user.id, email: user.email, chats: [] }
			const response = await axios.get(`${url}/users/${user.id}.json`)
			console.log(response)

			if (!response.data) {
				const putResponse = await axios.put(`${url}/users/${user.id}.json`, userItem)

				if (putResponse.statusText !== "OK") throw new Error("Server Error")
				console.log(putResponse)

				return putResponse.data
			}
		} catch (error) {
			return rejectWithValue((error as Error).message)
		}
	}
)

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
	extraReducers(builder) {
		builder.addCase(setUser.rejected, (state, action) => {
			state.error = action.payload!
		})
	},
})

export const { showLoader, addUser, setError, removeUser } = userSlice.actions
export default userSlice.reducer
