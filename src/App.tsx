import './App.css'
import UsersTable from './components/UsersTable'
import { useUserStore } from './store/useUserStore'
import ToggleBtn from './components/buttons/ToggleBtn'
import NormalBtn from './components/buttons/NormalBtn'
import { useFetchUsersTans } from './hooks/useFetchUsersTans'

function App() {
	const { setFilterCountry, resetDeletedUsers } = useUserStore()

	const { isLoading, isError, refetch } = useFetchUsersTans()

	const handleReset = () => {
		resetDeletedUsers()
		refetch()
	}

	return (
		<div className='App'>
			<header>
				<h1>List Of Users</h1>
				<div className='btn-cont'>
					<ToggleBtn text='Color rows' propertyName='showColors' />
					<ToggleBtn text='Order by country' />
					<NormalBtn text='Reset Users' handleClick={handleReset} />
					<input
						className='search-input'
						type='text'
						name='filter'
						placeholder='Search a country'
						onChange={(e) => setFilterCountry(e.target.value)}
					/>
				</div>
			</header>
			{isLoading && !isError && <p>Loading...</p>}
			{!isLoading && isError && <p>Error fetching data.</p>}
			{!isLoading && !isError && <UsersTable />}
		</div>
	)
}

export default App
