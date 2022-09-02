import { useAppSelector } from "./redux-hook"

function useAuth() {
	const { id, email, token } = useAppSelector((state) => state.user.user)
	const isAuth = !!id

	return {
		id,
		token,
		email,
		isAuth,
	}
}

export default useAuth
