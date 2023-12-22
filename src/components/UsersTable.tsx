import { useMemo } from 'react'
import { useUserStore } from '../store/useUserStore'
import { SortBy, User } from '../types/types'
import { useFetchUsersTans } from '../hooks/useFetchUsersTans'

export default function UsersTable() {
	const { showColors, sortingValue, filterCountry, deletedUsersId } =
		useUserStore()
	const { setSortingValue, addDeletedUser } = useUserStore()

	const { data, fetchNextPage, hasNextPage } = useFetchUsersTans()

	const users: User[] = data?.pages.flatMap((page) => page.users) ?? []

	const nonDeletedUsers = users.filter(
		(user) => !deletedUsersId.includes(user.login.uuid)
	)

	const filteredUsers = useMemo(() => {
		return filterCountry !== ''
			? nonDeletedUsers?.filter((user) =>
					user.location.country
						.toLowerCase()
						.includes(filterCountry.toLowerCase())
			  )
			: nonDeletedUsers
	}, [nonDeletedUsers, filterCountry])

	const sortFunctions = useMemo(
		() => ({
			[SortBy.NONE]: () => filteredUsers,
			[SortBy.COUNTRY]: () =>
				filteredUsers?.toSorted((a, b) =>
					a.location.country.localeCompare(b.location.country)
				),
			[SortBy.NAME]: () =>
				filteredUsers?.toSorted((a, b) =>
					a.name.first.localeCompare(b.name.first)
				),
			[SortBy.LAST]: () =>
				filteredUsers?.toSorted((a, b) =>
					a.name.last.localeCompare(b.name.last)
				),
		}),
		[filteredUsers]
	)

	const sortedUsers = useMemo(() => {
		return sortFunctions[sortingValue]
			? sortFunctions[sortingValue]()
			: filteredUsers
	}, [filteredUsers, sortingValue, sortFunctions])

	return (
		<>
			<table className='table'>
				<thead>
					<tr>
						<th>Photo</th>
						<th onClick={() => setSortingValue(SortBy.NAME)}>Name</th>
						<th onClick={() => setSortingValue(SortBy.LAST)}>Last Name</th>
						<th onClick={() => setSortingValue(SortBy.COUNTRY)}>Country</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className={`${showColors ? 'colored' : ''}`}>
					{sortedUsers?.map((user) => {
						return (
							<tr key={user.login.uuid}>
								<td className='image-cell'>
									<img
										src={user.picture.thumbnail}
										alt={`${user.name.first} Photo`}
									/>
								</td>
								<td>{user.name.first}</td>
								<td>{user.name.last}</td>
								<td>{user.location.country}</td>
								<td>
									<button
										className='btn action-btn'
										onClick={() => {
											addDeletedUser(user.login.uuid)
										}}>
										Delete
									</button>
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
			{hasNextPage === true && (
				<button onClick={async () => await fetchNextPage()}>
					More results
				</button>
			)}
		</>
	)
}
