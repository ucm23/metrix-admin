import competencies from '../mocks/competencies.json'

export const index_competencies_ = ({ filter, company_id }) => {
    let response = {
        status: false,
        data: [],
    }
    try {
        response = {
            status: true,
            data: competencies.filter(( item ) => item?.company_id === company_id),
            length: competencies.length,
        }
    } catch (error) {
        console.log('error index_competencies_: ', error);
    } finally {
        return response;
    }
}