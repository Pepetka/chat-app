import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import messagesReducer from "./slices/messageSlice"
import alertReducer from "./slices/alertSlice"
import usersListReducer from "./slices/usersListSlice"

const store = configureStore({
	reducer: {
		user: userReducer,
		usersList: usersListReducer,
		messages: messagesReducer,
		alert: alertReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
