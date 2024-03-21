import evaluations from '../mocks/evaluations.json'

export const index_evaluations_ = ({ filter, company_id }) => {
    let response = {
        status: false,
        data: [],
    }
    try {
        response = {
            status: true,
            data: evaluations.filter(( item ) => item?.company_id === company_id),
            length: evaluations.length,
        }
    } catch (error) {
        console.log('error index_users_: ', error);
    } finally {
        return response;
    }
}