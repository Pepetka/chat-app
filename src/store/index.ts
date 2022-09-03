import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./slices/userSlice"
import messagesReducer from "./slices/messageSlice"

const store = configureStore({
	reducer: {
		user: userReducer,
		messages: messagesReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
