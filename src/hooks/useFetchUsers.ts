import { useEffect, useRef, useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { User } from '../types/types'

const useFetchUsers = () => {
	const { setUsers } = useUserStore()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)

	const originalUsers = useRef<User[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					'https://randomuser.me/api/?results=100&seed=abc'
				)
				const usersData = await response.json()

				setUsers(usersData.results)
				originalUsers.current = usersData.results
			} catch (error) {
				console.log(error)
				setError(true)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [setUsers])

	const users = useUserStore((state) => state.users)

	return { users, loading, error, originalUsers: originalUsers.current }
}

export default useFetchUsers
