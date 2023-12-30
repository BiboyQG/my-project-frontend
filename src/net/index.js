import axios from "axios";

const authItemName = "access_token";

const defaultFailure = (message, code, url) => {
  console.warn(`Request to ${url} failed with code ${code}: ${message}`);
  alert(`Error sign in: ${message}`);
};

const defaultError = (err) => {
  console.error(err);
  alert("Something wrong happend, please consult an admin");
};

function internalPost(
  url,
  data,
  header,
  success,
  failure,
  error = defaultError
) {
  axios
    .post(url, data, { headers: header })
    .then(({ data }) => {
      if (data.code === 200) {
        success(data.data);
      } else {
        failure(data.message, data.code, url);
      }
    })
    .catch((err) => {
      error(err);
    });
}

function internalGet(
  url,
  header,
  success,
  failure,
  error = defaultError
) {
  axios
    .get(url, { headers: header })
    .then(({ data }) => {
      if (data.code === 200) {
        success(data.data);
      } else {
        failure(data.message, data.code, url);
      }
    })
    .catch((err) => {
      error(err);
    });
}

function takeToken() { 
    const str = localStorage.getItem(authItemName) || sessionStorage.getItem(authItemName);
    if (!str) {
        return null;
    }
    const authObj = JSON.parse(str);
    if (authObj.expire <= Date.now()) {
        deleteToken();
        alert("Token expired, please login again");
        return null;
    }
    return authObj.token;
}

function deleteToken() {
    localStorage.removeItem(authItemName);
    sessionStorage.removeItem(authItemName);
}

function storeToken(token, remember, expire) {
  const auth = {
    token: token,
    expire: expire,
  };
    if (remember) {
        localStorage.setItem(authItemName, JSON.stringify(auth));
    } else {
        sessionStorage.setItem(authItemName, JSON.stringify(auth));
    }
}

function login(username, password, remember, success, failure, error) {
  internalPost(
    "/api/auth/login",
    {
      username: username,
      password: password,
    },
    {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    (data) => {
        alert(`Login success! Welcome, ${data.username}!`);
        storeToken(data.token, remember, data.expire);
        success(data);
    },
    failure,
    error
  );
}

function accessHeader() {
  const token = takeToken();
  return token ? {
    "Authorization": `Bearer ${takeToken()}`
  } : {};
}

function get(url, success, failure = defaultFailure) {
  internalGet(url, accessHeader(), success, failure);
}

function post(url, data, success, failure = defaultFailure) { 
  internalPost(url, data, accessHeader(), success, failure);
}


function logout(success, failure = defaultFailure) {
  get("/api/auth/logout", () => {
    deleteToken();
    alert("Logout success!");
    success();
  }, failure);
}

export { login, logout, get, post};
