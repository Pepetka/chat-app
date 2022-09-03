import { BrowserRouter } from "react-router-dom"
import NavBar from "./components/NavBar/NavBar"
import "./App.scss"
import AppRouter from "./components/AppRouter/AppRouter"
import { Provider } from "react-redux"
import store from "./store"
import "./services/firebase"

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<NavBar />
				<main className='container'>
					<AppRouter />
				</main>
			</BrowserRouter>
		</Provider>
	)
}

export default App
