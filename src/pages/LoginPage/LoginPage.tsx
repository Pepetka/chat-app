import { FC } from "react"
import { Link } from "react-router-dom"
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import Form, { Inputs } from "../../components/Form/Form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook"
import { REGISTER_ROUTE } from "../../utils/constants"
import { showLoader, addUser, setError } from "../../store/slices/userSlice"
import Loader from "../../components/Loader/Loader"
import { auth } from "../../services/firebase"

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.user)

	const onSubmitUser = ({ email, password, rememberMe }: Inputs): void => {
		dispatch(showLoader())

		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = {
					id: userCredential.user.uid,
					token: userCredential.user.refreshToken,
					email: userCredential.user.email,
				}

				dispatch(addUser({ user }))

				if (rememberMe) localStorage.setItem("user", JSON.stringify(user))
			})
			.catch((error) => {
				dispatch(setError({ error: error.message }))
			})
	}

	const onLogin = () => {
		dispatch(showLoader())

		const provider = new GoogleAuthProvider()

		signInWithPopup(auth, provider)
			.then((result) => {
				const credential = GoogleAuthProvider.credentialFromResult(result!)

				const user = {
					id: result?.user.uid,
					token: credential?.accessToken,
					email: result?.user.email,
				}

				dispatch(addUser({ user }))

				localStorage.setItem("user", JSON.stringify(user))
			})
			.catch((error) => {
				// const errorCode = error.code
				// const errorMessage = error.message
				// const email = error.customData.email
				// const credential = GoogleAuthProvider.credentialFromError(error)
			})
	}

	if (loading)
		return (
			<div className='w-75 m-auto pt-5'>
				<Loader />
			</div>
		)

	return (
		<div className='w-75 m-auto pt-5'>
			<h1 className='text-center'>Login</h1>
			<Form title='Login' onSubmitUser={onSubmitUser} />
			<div className='mt-2'>
				{"Or "}
				<Link to={REGISTER_ROUTE} className='link-primary'>
					Register
				</Link>
			</div>
			<button onClick={onLogin} type='button' className='btn btn-outline-primary w-100 mt-3'>
				Login width Google
			</button>
		</div>
	)
}

export default LoginPage
