import { FC } from "react"
import { IMessage } from "../../types"

interface MessageProps {
	messageItem: IMessage
	isUserMessage: boolean
}

const Message: FC<MessageProps> = ({ messageItem, isUserMessage }) => {
	const messageClasses = `list-group-item w-75 m-2 ${
		isUserMessage ? " align-self-end text-end primary-elem" : " text-start default-elem"
	}`

	return (
		<li key={messageItem.date} className={messageClasses}>
			<div className='primary-text'>{messageItem.message}</div>
			<div className='secondary-text'>{isUserMessage ? "Me" : messageItem.email}</div>
			<div className='secondary-text'>{messageItem.date}</div>
		</li>
	)
}

export default Message
