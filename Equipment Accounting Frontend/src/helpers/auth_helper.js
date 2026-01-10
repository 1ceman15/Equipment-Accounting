import { UserManager } from 'oidc-client-ts';

const settings = {
  authority: "http://localhost:8082/realms/equipment_accounting",
  client_id: "equipment_accounting_frontend",
  redirect_uri: "http://localhost:3000/signin-callback.html",
  response_type: 'code',
  scope: "openid profile equipment_accounting_frontend",
  loadUserInfo: true
};

const userManager = new UserManager(settings);

export const getUser = () => {
    return userManager.getUser();
}

export const login = () => {
    return userManager.signinRedirect();
}

export const logout = () => {
    return userManager.signoutRedirect();
}
