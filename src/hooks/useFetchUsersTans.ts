import { useQuery } from '@tanstack/react-query'
import { User } from '../types/types'

async function fetchUsers() {
	const response = await fetch(
		'https://randomuser.me/api/?results=100&seed=abc123'
	)
	if (!response.ok) {
		throw new Error('Network response was not ok.')
	}
	const data = await response.json()

	return data.results
}

export function useFetchUsersTans() {
	return useQuery<User[]>({
		queryKey: ['users'],
		queryFn: fetchUsers,
	})
}
