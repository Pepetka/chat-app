import { FC } from "react"
import { IMessage } from "../../types"

interface MessageProps {
	messageItem: IMessage
	isUserMessage: boolean
}

const Message: FC<MessageProps> = ({ messageItem, isUserMessage }) => {
	const messageClasses = isUserMessage
		? "list-group-item list-group-item-primary w-75 m-2 align-self-end text-end"
		: "list-group-item list-group-item-dark w-75 m-2"

	return (
		<li key={messageItem.date} className={messageClasses}>
			<div>{messageItem.message}</div>
			<div className='text-black-50'>{isUserMessage ? "Me" : messageItem.email}</div>
			<div className='text-black-50'>{messageItem.date}</div>
		</li>
	)
}

export default Message
