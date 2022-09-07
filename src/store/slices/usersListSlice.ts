import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from ".."
import { IUserItem } from "../../types"

const url = process.env.REACT_APP_DB_URL

interface IState {
	error: null | string
	users: IUserItem[]
	loading: boolean
}

const initialState: IState = {
	error: null,
	users: [],
	loading: false,
}

export const fetchUsers = createAsyncThunk<
	IUserItem[],
	any,
	{ state: RootState; rejectValue: string }
>("usersList/fetchUsers", async (_, { rejectWithValue }) => {
	try {
		const usersArr: IUserItem[] = []
		const response = await axios.get(`${url}/users.json`)

		if (response.statusText !== "OK") throw new Error("Server Error")

		for (const key in response.data) {
			usersArr.push(response.data[key])
		}

		return usersArr
	} catch (error) {
		return rejectWithValue((error as Error).message)
	}
})

const usersListSlice = createSlice({
	name: "usersList",
	initialState,
	reducers: {
		setUsers(state, action) {
			state.error = null
			state.loading = false
			state.users = action.payload.users
		},
	},
	extraReducers(builder) {
		builder
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.loading = false
				state.users = action.payload
				state.error = null
			})
			.addCase(fetchUsers.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload!
			})
	},
})

export const { setUsers } = usersListSlice.actions
export default usersListSlice.reducer
