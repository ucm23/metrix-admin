import NavBar from "../../layouts/NavBar"
import ContainerTable from "../../components/ContainerTable";
import { index_companys_ } from "../../api/companys/companys";
import { index_categories_ } from "../../api/categories/categories";

function Category({ path }) {

    let label = 'Categorías'
    let bread = [
        {
            path,
            label
        }
    ]

    return (
        <NavBar bread={bread}>
            <ContainerTable
                index_={index_categories_}
                table={path}
                label={label}
                attributes={{
                    header: ['Nombre', 'Creación',],
                    props_: ['name', 'created_at'],
                    width: [60, 40],
                    state: ['active'],
                    withID: true,
                }}
                bread={bread}
                screenDetails={'/category/'}
                openModal={false}
                filters={{
                    search: false,
                    type: true,
                }}

            />
        </NavBar>
    )
}

export default Category
