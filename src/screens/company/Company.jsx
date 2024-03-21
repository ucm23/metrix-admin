import NavBar from "../../layouts/NavBar"
import ContainerTable from "../../components/ContainerTable";
import { index_companys_ } from "../../api/companys/companys";

function Company({ path }) {

    let label='Empresas'
    let bread = [
        {
            path,
            label
        }
    ]

    return (
        <NavBar bread={bread}>
            <ContainerTable
                index_={index_companys_}
                table={path}
                label={label}
                attributes={{
                    header: ['Nombre', 'Creación',],
                    props_: ['logo', 'created_at'],
                    width: [60, 40],
                    state: ['active'],
                    withID: true,
                }}
                bread={bread}
                screenDetails={'/company/'}
                openModal={false}
                filters={{
                    search: true,
                    type: true,
                }}
            />
        </NavBar>
    )
}

export default Company
