import Chat from "./components/Chat/Chat"
import AboutPage from "./pages/AboutPage/AboutPage.lazy"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage.lazy"
import { ABOUT_ROUTE, CHAT_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE } from "./utils/constants"

export const publicRoutes = [
	{
		path: LOGIN_ROUTE,
		Component: LoginPage,
	},
	{
		path: REGISTER_ROUTE,
		Component: RegisterPage,
	},
	{
		path: ABOUT_ROUTE,
		Component: AboutPage,
	},
]

export const privateRoutes = [
	{
		path: CHAT_ROUTE,
		Component: Chat,
	},
	{
		path: ABOUT_ROUTE,
		Component: AboutPage,
	},
]
