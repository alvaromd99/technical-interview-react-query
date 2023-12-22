import { create } from 'zustand'
import { SortBy } from '../types/types'

export interface UserState {
	showColors: boolean
	sortingValue: SortBy
	filterCountry: string
	deletedUsersId: string[]
}

interface UserActions {
	toggleProperty: <K extends keyof UserState>(propertyName: K) => void
	setFilterCountry: (value: string) => void
	setSortingValue: (value: SortBy) => void
	addDeletedUser: (id: string) => void
	resetDeletedUsers: () => void
}

export const useUserStore = create<UserState & UserActions>((set, get) => ({
	showColors: false,
	sortingValue: SortBy.NONE,
	filterCountry: '',
	deletedUsersId: [],

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
	addDeletedUser: (uuid) => {
		set((state) => ({
			deletedUsersId: [...state.deletedUsersId, uuid],
		}))
	},
	resetDeletedUsers: () => {
		set(() => ({
			deletedUsersId: [],
		}))
	},
}))
