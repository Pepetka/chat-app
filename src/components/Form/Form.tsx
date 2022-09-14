import { FC } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

interface FormProps {
	title: string
	onSubmitUser: (data: Inputs) => void
}
export interface Inputs {
	email: string
	password: string
	rememberMe: boolean
}

const schema = yup
	.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
		rememberMe: yup.boolean(),
	})
	.required()

const Form: FC<FormProps> = ({ title, onSubmitUser }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(schema),
		mode: "onChange",
	})
	const onSubmit: SubmitHandler<Inputs> = onSubmitUser

	return (
		<form onSubmit={handleSubmit(onSubmit)} noValidate>
			<div className='mb-3'>
				<label className='form-label w-100'>
					Email address
					<input
						type='email'
						placeholder='example@example.com'
						className='form-control secondary-elem primary-text'
						{...register("email")}
					/>
				</label>
				{errors.email && <div className='form-text text-danger'>{errors.email?.message}</div>}
			</div>
			<div className='mb-3'>
				<label className='form-label w-100'>
					Password
					<input
						type='password'
						className='form-control secondary-elem primary-text'
						{...register("password")}
					/>
				</label>
				{errors.password && <div className='form-text text-danger'>{errors.password?.message}</div>}
			</div>
			<div className='mb-3 form-check'>
				<label className='form-check-label w-100'>
					<input
						type='checkbox'
						className='form-check-input secondary-elem'
						{...register("rememberMe")}
					/>
					Remember me
				</label>
			</div>
			<button type='submit' className='btn primary-elem'>
				{title}
			</button>
		</form>
	)
}

export default Form
