const tokenName = "userCredential";


export const getLocalToken = function getLocalToken(name) {
  return JSON.parse(window.localStorage.getItem(name || tokenName));
};


export const setLocalToken = function setLocalToken(token, name) {
  window.localStorage.setItem(name || tokenName, JSON.stringify(token));
};

export const deleteLocalToken = function deleteLocalToken(name) {
  window.localStorage.removeItem(name || tokenName);
};

export const logUserOut = function logUserOut() {
  deleteLocalToken();
};

export const isLoggedIn = function isLoggedIn() {
  return Boolean(getLocalToken());
};

export const requireAuth = function requireAuth(nextState, replace) {
  if (!isLoggedIn()) {
    replace({ pathname: "/login" });
  }
};
