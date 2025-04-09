import Cookies from 'js-cookie';

const TokenKey = 'saber3-access-token';
const SessionId = 'JSESSIONID';
const UserId = 'b-user-id';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function removeToken() {
    Cookies.remove(SessionId);
    Cookies.remove(UserId);
    return Cookies.remove(TokenKey);
}
