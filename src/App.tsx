import './App.css'
import UsersTable from './components/UsersTable'
import { useUserStore } from './store/useUserStore'
import ToggleBtn from './components/buttons/ToggleBtn'
import NormalBtn from './components/buttons/NormalBtn'
import useFetchUsers from './hooks/useFetchUsers'

function App() {
	const { originalUsers, loading, error } = useFetchUsers()
	const { setUsers, setFilterCountry } = useUserStore()

	const handleReset = () => {
		setUsers(originalUsers)
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
			{loading && !error && <p>Loading...</p>}
			{!loading && error && <p>Error fetching data.</p>}
			{!loading && !error && <UsersTable />}
		</div>
	)
}

export default App
