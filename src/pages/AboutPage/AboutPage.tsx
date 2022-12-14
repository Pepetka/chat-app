import { FC } from "react"

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = () => (
	<div className='h-100 p-5 border rounded-3 mt-5 primary-elem text-start'>
		<h2>About Chat App</h2>
		<p>
			<strong>App version: </strong> v2.1.0
			<br />
			<strong>Description: </strong>
			Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere reiciendis fugiat quisquam
			itaque perferendis, eius sint vel error et libero ex, autem architecto asperiores temporibus
			quam? Itaque officiis repudiandae quibusdam, ratione culpa iusto dignissimos alias nulla nemo
			quidem enim ullam placeat. Voluptatibus id ipsa mollitia aliquid odio eius architecto
			obcaecati, dolorem cum sapiente labore optio quidem nesciunt neque delectus! Maiores doloribus
			aut modi vero placeat nam sunt sapiente blanditiis adipisci!
		</p>
	</div>
)

export default AboutPage
