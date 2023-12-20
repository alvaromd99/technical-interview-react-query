import { create } from 'zustand'
import { SortBy, User } from '../types/types'

export interface UserState {
	users: User[]
	showColors: boolean
	sortingValue: SortBy
	filterCountry: string
	currentPage: number
}

interface UserActions {
	setUsers: (newUsers: User[]) => void
	deleteUser: (uuid: string) => void
	toggleProperty: <K extends keyof UserState>(propertyName: K) => void
	setFilterCountry: (value: string) => void
	setSortingValue: (value: SortBy) => void
	setNextCurrentPage: () => void
}

export const useUserStore = create<UserState & UserActions>((set, get) => ({
	users: [],
	showColors: false,
	sortingValue: SortBy.NONE,
	filterCountry: '',
	currentPage: 1,

	setUsers: (newUsers) => {
		set(() => ({
			users: newUsers,
			originalUsers: newUsers,
		}))
	},

	deleteUser: (uuid) => {
		const filterUsers = get().users.filter((u) => u.login.uuid !== uuid)

		set(() => ({
			users: filterUsers,
		}))
	},

	toggleProperty: (propertyName) => {
		set(() => ({
			[propertyName]: !get()[propertyName],
		}))
	},

	setFilterCountry: (value) => {
		set(() => ({
			filterCountry: value,
		}))
	},

	setSortingValue: (value) => {
		const newSortingValue =
			get().sortingValue === SortBy.NONE ? value : SortBy.NONE
		set(() => ({
			sortingValue: newSortingValue,
		}))
	},

	setNextCurrentPage: () => {
		set(() => ({
			currentPage: get().currentPage + 1,
		}))
	},
}))
