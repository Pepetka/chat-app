import { BrowserRouter } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import "./App.scss"
import AppRouter from "./components/AppRouter/AppRouter"
import { Provider } from "react-redux"
import store from "./store"
import "./services/firebase"
import Alert from "./components/Alert/Alert"
import ThemeButton from "./components/ThemeButton/ThemeButton"
import { useState } from "react"

type Theme = "dark" | "light"

const defaultTheme: Theme = (localStorage.getItem("theme") as Theme) ?? "light"

function App() {
	const [theme, setTheme] = useState<Theme>(defaultTheme)

	const onThemeChange = () => {
		const newTheme = theme === "light" ? "dark" : "light"

		setTheme(newTheme)

		localStorage.setItem("theme", newTheme)
	}

	return (
		<Provider store={store}>
			<BrowserRouter>
				<div className={`App ${theme}`}>
					<NavBar />
					<main className='container pt-5 pb-4'>
						<Alert />
						<AppRouter />
					</main>
					<ThemeButton onThemeChange={onThemeChange} theme={theme} />
				</div>
			</BrowserRouter>
		</Provider>
	)
}

export default App
