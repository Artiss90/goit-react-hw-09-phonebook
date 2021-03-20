const getIsAuthenticated = state => state.auth.isAuthenticated;
const getUserName = state => state.auth.user.name;
const getErrorMessage = state => state.auth.error;

// eslint-disable-next-line import/no-anonymous-default-export
export default { getIsAuthenticated, getUserName, getErrorMessage };
