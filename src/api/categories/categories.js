import categories from '../mocks/categories.json'

export const index_categories_ = ({ filter, company_id }) => {
    let response = {
        status: false,
        data: [],
    }
    try {
        response = {
            status: true,
            data: categories.filter(( item ) => item?.company_id === company_id),
            length: categories.length,
        }
    } catch (error) {
        console.log('error index_competencies_: ', error);
    } finally {
        return response;
    }
}