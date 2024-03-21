import users from '../mocks/users.json'

export const index_users_ = ({ filter, company_id }) => {
    let response = {
        status: false,
        data: [],
    }
    try {
        response = {
            status: true,
            data: users.filter(( item ) => item?.company_id === company_id),
            length: users.length,
        }
    } catch (error) {
        console.log('error index_users_: ', error);
    } finally {
        return response;
    }
}