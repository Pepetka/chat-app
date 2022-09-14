import { FC } from "react"
import { NavLink } from "react-router-dom"
import { useAppDispatch } from "../../hooks/redux-hook"
import useAuth from "../../hooks/user-hook"
import { removeUser } from "../../store/slices/userSlice"
import { ABOUT_ROUTE, CHAT_ROUTE, LOGIN_ROUTE } from "../../utils/constants"

interface NavBarProps {}

const NavBar: FC<NavBarProps> = () => {
	const { isAuth } = useAuth()
	const dispatch = useAppDispatch()

	const onLogout = () => {
		dispatch(removeUser())
		localStorage.removeItem("user")
	}

	return (
		<nav className='navbar navbar-expand d-flex justify-content-between ps-3 pe-3 primary-elem'>
			<div className='container-fluid'>
				<div className='d-flex justify-content-between'>
					<div className='navbar-brand primary-text'>Chat App</div>
					<ul className='navbar-nav'>
						<li className='nav-item'>
							<NavLink className='nav-link primary-link' to={CHAT_ROUTE}>
								Chat
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link primary-link' to={ABOUT_ROUTE}>
								About
							</NavLink>
						</li>
					</ul>
				</div>

				<ul className='navbar-nav'>
					<li className='nav-item'>
						{isAuth ? (
							<NavLink className='nav-link primary-link' to={LOGIN_ROUTE} onClick={onLogout}>
								Logout
							</NavLink>
						) : (
							<NavLink className='nav-link primary-link' to={LOGIN_ROUTE}>
								Login
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default NavBar
