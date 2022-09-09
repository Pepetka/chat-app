import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react"
import { ref, set, onValue } from "firebase/database"
import { db } from "../../services/firebase"
import useAuth from "../../hooks/user-hook"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook"
import { setChat, setMessages, setNewChat } from "../../store/slices/messageSlice"
import Loader from "../Loader/Loader"
import { IMessage, IUserItem } from "../../types"
import Message from "../Message/Message"
import { setUsers } from "../../store/slices/usersListSlice"

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
	const [message, setMessage] = useState("")
	const { email } = useAuth()
	const dispatch = useAppDispatch()
	const { loading, messages, currentChat } = useAppSelector((state) => state.messages)
	const { users } = useAppSelector((state) => state.usersList)
	const refUl = useRef<null | HTMLUListElement>(null)

	const onMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.currentTarget.value)
	}

	const onMessageSend = (event: FormEvent) => {
		event.preventDefault()

		set(ref(db, `chats/${currentChat.id}/` + messages.length), {
			email: email,
			date: new Date().toLocaleString(),
			message,
		})

		setMessage("")
	}

	useEffect(() => {
		onValue(ref(db, `chats/${currentChat.id}/`), (snapshot) => {
			const data: { [key: string]: IMessage } = snapshot.val()
			const messagesArr: IMessage[] = []

			if (data) {
				for (const key of Object.keys(data)) {
					messagesArr.push(data[key])
				}
			}

			dispatch(setMessages({ messages: messagesArr }))

			if (snapshot.key === "general") {
				dispatch(setChat())
			} else {
				const chatEmail = users.filter(
					(user) =>
						user.chats.filter((chat) => chat.chatId === snapshot.key && chat.email === email).length
				)[0].email

				dispatch(setNewChat({ id: snapshot.key, chatName: chatEmail }))
			}
		})
		// eslint-disable-next-line
	}, [currentChat])

	useEffect(() => {
		onValue(ref(db, `users/`), (snapshot) => {
			const data: { [key: string]: IUserItem } = snapshot.val()
			const usersArr: IUserItem[] = []

			if (data) {
				for (const key of Object.keys(data)) {
					usersArr.push(data[key])
				}
			}

			dispatch(setUsers({ users: usersArr }))
		})
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (refUl.current) refUl.current!.scrollTop = refUl.current!.scrollHeight
	}, [messages])

	if (loading) return <Loader />

	return (
		<>
			<div className='list-group d-flex flex-row border border-primary justify-content-between align-items-center w-100 p-2 mb-3'>
				{currentChat.id !== "general" ? (
					<button className='btn btn-primary' onClick={() => dispatch(setChat())}>
						Back
					</button>
				) : null}
				<div className='text-primary mt-2 mb-2 ms-auto me-auto'>{currentChat.chatName}</div>
			</div>

			<ul
				ref={refUl}
				className='chat list-group d-flex border border-primary bg-primary bg-opacity-50'
			>
				{messages.map((messageItem, i) => (
					<Message key={i} messageItem={messageItem} isUserMessage={email === messageItem.email} />
				))}
			</ul>

			<form>
				<div className='input-group mt-3'>
					<input
						onChange={onMessageChange}
						value={message}
						type='text'
						className='form-control border border-primary'
						placeholder='Enter message'
					/>
					<button className='btn btn-outline-primary' type='submit' onClick={onMessageSend}>
						Send
					</button>
				</div>
			</form>
		</>
	)
}

export default Chat
