import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react"
import { ref, set, onValue } from "firebase/database"
import { db } from "../../services/firebase"
import useAuth from "../../hooks/user-hook"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hook"
import { setMessages } from "../../store/slices/messageSlice"
import Loader from "../Loader/Loader"
import { IMessage } from "../../types"
import Message from "../Message/Message"

interface ChatProps {}

const Chat: FC<ChatProps> = () => {
	const [message, setMessage] = useState("")
	const { email } = useAuth()
	const dispatch = useAppDispatch()
	const { loading, messages } = useAppSelector((state) => state.messages)
	const refUl = useRef<null | HTMLUListElement>(null)

	const onMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.currentTarget.value)
	}

	const onMessageSend = (event: FormEvent) => {
		event.preventDefault()

		set(ref(db, "notes/" + messages.length), {
			email: email,
			date: new Date().toLocaleString(),
			message,
		})

		setMessage("")
	}

	useEffect(() => {
		const starCountRef = ref(db, "notes/")
		onValue(starCountRef, (snapshot) => {
			const data: { [key: string]: IMessage } = snapshot.val()
			const messagesArr: IMessage[] = []

			if (data) {
				for (const key of Object.keys(data)) {
					messagesArr.push(data[key])
				}
			}

			dispatch(setMessages({ messages: messagesArr }))
		})
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (refUl.current) refUl.current!.scrollTop = refUl.current!.scrollHeight
	}, [messages])

	if (loading) return <Loader />

	return (
		<>
			<ul
				ref={refUl}
				className='chat list-group d-flex border border-primary bg-primary bg-opacity-50'
			>
				{messages.map((messageItem) => (
					<Message
						key={messageItem.date}
						messageItem={messageItem}
						isUserMessage={email === messageItem.email}
					/>
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
