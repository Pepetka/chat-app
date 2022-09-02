import Chat from "./components/Chat/Chat"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import { CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./utils/constants"

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: LoginPage,
	},
	{
		path: REGISTER_ROUTE,
		Component: RegisterPage,
	},
]

export const privateRoutes = [
	{
		path: CHAT_ROUTE,
		Component: Chat,
	},
]
