import ContainerTable from "../components/ContainerTable"
import NavBar from "../layouts/NavBar"


function Users({ }) {
    let table = 'users';
    return (
        <NavBar bread={[table]}>
        </NavBar>
    )
}

export default Users
