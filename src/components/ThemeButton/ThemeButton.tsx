interface ThemeButtonProps {
	onThemeChange: () => void
	theme: string
}

const ThemeButton = ({ onThemeChange, theme }: ThemeButtonProps) => {
	return (
		<button
			onClick={onThemeChange}
			className='theme-button d-flex justify-content-center align-items-center primary-elem'
		>
			{theme === "dark" ? (
				<i className='fa-solid fa-moon'></i>
			) : (
				<i className='fa-solid fa-sun'></i>
			)}
		</button>
	)
}

export default ThemeButton
