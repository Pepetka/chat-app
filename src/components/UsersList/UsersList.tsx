import { FC, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook"
import { changeChat } from "../../store/slices/messageSlice"
import { fetchUsers } from "../../store/slices/usersListSlice"
import Loader from "../Loader/Loader"

interface UsersListProps {}

const UsersList: FC<UsersListProps> = () => {
	const dispatch = useAppDispatch()
	const { error, loading, users } = useAppSelector((state) => state.usersList)
	const { currentChat } = useAppSelector((state) => state.messages)
	const { id } = useAppSelector((state) => state.user.user)

	useEffect(() => {
		dispatch(fetchUsers(""))
		// eslint-disable-next-line
	}, [])

	const onChangeChat = (id: string) => {
		dispatch(changeChat(id))
	}

	if (loading) return <Loader />
	if (error)
		return (
			<div>
				<h2>{error}</h2>
				<button
					onClick={() => dispatch(fetchUsers(""))}
					className='btn btn-primary ms-auto me-auto'
				>
					Reload users
				</button>
			</div>
		)

	return (
		<>
			<ul className='list-group'>
				{users
					.filter((el) => el.id !== id)
					.map((user) => {
						return (
							<li
								className='list-group-item d-flex justify-content-between align-items-center p-2'
								key={user.id}
							>
								<span className='mt-2 mb-2'>{user.email}</span>
								{currentChat.chatName !== user.email ? (
									<button className='btn btn-primary' onClick={() => onChangeChat(user.id!)}>
										Chat
									</button>
								) : null}
							</li>
						)
					})}
			</ul>
			<ul></ul>
		</>
	)
}

export default UsersList
