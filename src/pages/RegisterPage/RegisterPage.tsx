import { FC } from "react"
import { Link } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import Form, { Inputs } from "../../components/Form/Form"
import { LOGIN_ROUTE } from "../../utils/constants"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook"
import { addUser, showLoader, setError } from "../../store/slices/userSlice"
import Loader from "../../components/Loader/Loader"

interface RegisterPageProps {}

const RegisterPage: FC<RegisterPageProps> = () => {
	const dispatch = useAppDispatch()
	const { loading } = useAppSelector((state) => state.user)

	const onSubmitUser = ({ email, password, rememberMe }: Inputs) => {
		dispatch(showLoader())

		const auth = getAuth()
		createUserWithEmailAndPassword(auth, email, password)
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
					<h1 className='text-center'>Register</h1>
					<Form title='Register' onSubmitUser={onSubmitUser} />
					<div className='mt-2'>
						{"Or "}
						<Link to={LOGIN_ROUTE} className='link-primary'>
							Login
						</Link>
					</div>
				</>
			)}
		</div>
	)
}

export default RegisterPage
