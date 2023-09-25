import {post, get, del, put} from '@/utils/request'
import Base  from './auth-base-api'


const authApi = {
  Login: Base.serviceName + '/v1/login/account',
  Logout: Base.serviceName + '/v1/logout',
  ForgePassword: Base.serviceName + '/v1/auth/forge-password',
  Register: Base.serviceName + '/v1/auth/register',
  twoStepCode: Base.serviceName + '/v1/auth/2step-code',
  SendSms: Base.serviceName + '/v1/account/sms',
  SendSmsErr: Base.serviceName + '/v1/account/sms_err',
  UserInfo: Base.serviceName + '/v1/user/info',
  UserMenu: Base.serviceName + '/v1/user/routes'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return post({
    url: authApi.Login,
    data: parameter
  })
}
