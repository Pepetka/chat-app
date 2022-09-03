import { FC, useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAppDispatch } from "../../hooks/redux-hook"
import useAuth from "../../hooks/user-hook"
import { privateRoutes, publicRoutes } from "../../routes"
import { addUser } from "../../store/slices/userSlice"
import { LOGIN_ROUTE } from "../../utils/constants"

interface AppRouterProps {}

const AppRouter: FC<AppRouterProps> = () => {
	const { isAuth } = useAuth()
	const dispatch = useAppDispatch()

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user")!)

		if (user !== null) dispatch(addUser({ user }))
		// eslint-disable-next-line
	}, [])

	return (
		<>
			{isAuth ? (
				<Routes>
					{privateRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} />
					))}
					<Route path='*' element={<Navigate to='/chat' state={{ replace: true }} />} />
				</Routes>
			) : (
				<Routes>
					{publicRoutes.map(({ path, Component }) => (
						<Route key={path} path={path} element={<Component />} />
					))}
					<Route path='*' element={<Navigate to={LOGIN_ROUTE} state={{ replace: true }} />} />
				</Routes>
			)}
		</>
	)
}

export default AppRouter
