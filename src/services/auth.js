import {post} from '../utils/request'

export function loginApi(user) {
    return post('/api/user/login',user)
}

