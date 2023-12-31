import { User } from './../types/types'
import { useInfiniteQuery } from '@tanstack/react-query'

interface Response {
	users: User[]
	nextPage?: number
}

interface Params {
	pageParam: number
}

async function fetchUsers({ pageParam }: Params) {
	console.log(pageParam)

	const response = await fetch(
		`https://randomuser.me/api/?page=${pageParam}&results=10&seed=abc123`
	)
	if (!response.ok) {
		throw new Error('Network response was not ok.')
	}
	const data = await response.json()

	const nextPageNum = data.info.page > 3 ? undefined : data.info.page + 1

	return {
		users: data.results,
		nextPage: nextPageNum,
	}
}

export function useFetchUsersTans() {
	return useInfiniteQuery<Response>({
		queryKey: ['users'],
		queryFn: ({ pageParam }) => fetchUsers({ pageParam: pageParam as number }),
		initialPageParam: 1,
		getNextPageParam: (lastPage) => lastPage.nextPage,
		refetchOnWindowFocus: false,
	})
}
