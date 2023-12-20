import { UserState, useUserStore } from '../../store/useUserStore'
import { SortBy } from '../../types/types'

interface ToggleBtnProps {
	text: string
	propertyName?: keyof UserState
}

const ToggleBtn = ({ text, propertyName }: ToggleBtnProps) => {
	const { toggleProperty, setSortingValue } = useUserStore()

	const handleClick =
		propertyName !== undefined
			? () => toggleProperty(propertyName)
			: () => setSortingValue(SortBy.COUNTRY)

	return (
		<button className='btn' onClick={handleClick}>
			{text}
		</button>
	)
}

export default ToggleBtn
