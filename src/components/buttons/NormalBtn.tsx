interface NormalBtnProps {
	text: string
	handleClick: () => void
}

const NormalBtn = ({ text, handleClick }: NormalBtnProps) => {
	return (
		<button className='btn' onClick={handleClick}>
			{text}
		</button>
	)
}

export default NormalBtn
