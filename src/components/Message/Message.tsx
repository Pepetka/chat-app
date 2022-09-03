import { FC } from "react"
import { IMessage } from "../../types"

interface MessageProps {
	messageItem: IMessage
	isUserMessage: boolean
}

const Message: FC<MessageProps> = ({ messageItem, isUserMessage }) => {
	if (isUserMessage)
		return (
			<li
				key={messageItem.date}
				className='list-group-item list-group-item-primary align-self-end w-75 m-2'
			>
				<div className='d-flex justify-content-between flex-row-reverse'>
					<span>{messageItem.message}</span>
					<span className='text-black-50'>{messageItem.date}</span>
				</div>
				<div className='text-black-50 text-end'>{messageItem.email}</div>
			</li>
		)

	return (
		<li key={messageItem.date} className='list-group-item list-group-item-secondary w-75 m-2'>
			<div className='d-flex justify-content-between'>
				<span>{messageItem.message}</span>
				<span className='text-black-50'>{messageItem.date}</span>
			</div>
			<span className='text-black-50'>{messageItem.email}</span>
		</li>
	)
}

export default Message
