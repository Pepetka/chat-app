import { FC } from "react"
import { Link } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Form, { Inputs } from "../../components/Form/Form"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook"
import { REGISTER_ROUTE } from "../../utils/constants"
import { showLoader, addUser, setError } from "../../store/slices/userSlice"
import Loader from "../../components/Loader/Loader"

interface LoginPageProps {}

const LoginPage: FC<LoginPageProps> = () => {
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.user)

	const onSubmitUser = ({ email, password, rememberMe }: Inputs): void => {
		dispatch(showLoader())

		const auth = getAuth()
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

	return (
		<div className='w-75 m-auto pt-5'>
			{loading ? (
				<Loader />
			) : (
				<>
					<h1 className='text-center'>Login</h1>
					<Form title='Login' onSubmitUser={onSubmitUser} />
					<div className='mt-2'>
						{"Or "}
						<Link to={REGISTER_ROUTE} className='link-primary'>
							Register
						</Link>
					</div>
				</>
			)}
		</div>
	)
}

export default LoginPage
