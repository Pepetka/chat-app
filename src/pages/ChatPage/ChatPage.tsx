import { FC } from "react"
import Chat from "../../components/Chat/Chat"
import UsersList from "../../components/UsersList/UsersList"

interface ChatPageProps {}

const ChatPage: FC<ChatPageProps> = () => {
	return (
		<div className='chat-page'>
			<h1 className='text-center'>Chat</h1>
			<UsersList />
			<Chat />
		</div>
	)
}

export default ChatPage
