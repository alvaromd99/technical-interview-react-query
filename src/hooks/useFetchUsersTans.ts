import { User } from './../types/types'
import { useInfiniteQuery } from '@tanstack/react-query'

interface Response {
	users: User[]
	nextPage: number
}

interface Params {
	pageParam?: number
}

// TODO Fix this any
async function fetchUsers({ pageParam }: any) {
	console.log(pageParam)

	const response = await fetch(
		`https://randomuser.me/api/?page=${pageParam}&results=10&seed=abc123`
	)
	if (!response.ok) {
		throw new Error('Network response was not ok.')
	}
	const data = await response.json()

	return {
		users: data.results,
		nextPage: data.info.page + 1,
	}
}

export function useFetchUsersTans() {
	return useInfiniteQuery<Response>({
		queryKey: ['users'],
		queryFn: fetchUsers,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPage,
	})
}
