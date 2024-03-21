import companies from '../mocks/companies.json'

export const index_companys_ = ({ filter }) => {
    let response = {
        status: false,
        data: [],
    }
    try {
        response = {
            status: true,
            data: filter ? companies.filter(( item ) => ([filter].includes(item?.name)) ) : companies,
            length: companies.length,
        }
    } catch (error) {
        console.log('error index_companys_: ', error);
    } finally {
        return response;
    }
}