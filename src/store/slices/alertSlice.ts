import { createSlice } from "@reduxjs/toolkit"

type AlertType = "primary" | "success" | "danger"

interface IAlertState {
	show: boolean
	alertType: AlertType
	message: string
}

const initialState: IAlertState = {
	show: false,
	alertType: "primary",
	message: "",
}

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		showAlert(state, action) {
			state.show = true
			state.alertType = action.payload.alertType
			state.message = action.payload.message
		},
		hideAlert(state) {
			state.show = false
			state.alertType = "primary"
			state.message = ""
		},
	},
})

export const { showAlert, hideAlert } = alertSlice.actions
export default alertSlice.reducer
