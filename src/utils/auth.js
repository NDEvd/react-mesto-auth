export const BASE_URL = 'https://auth.nomoreparties.co';

export const register = ( password, email ) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email })
  })
  .then((response) => {
    return response.json();
  })
  // .then((res) => {
  //   return res;
  // })
  // .catch((err) => console.log(err));
};

export const authorize = ( password, email ) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
        "Content-Type": "application/json" 
    },
    body: JSON.stringify({ password, email })
  })
  .then((response => response.json()))
  // .then((res) => {
  //   if (res.user){
  //     localStorage.setItem('jwt', res.token);
  //     return res;
  //   }
  // })
  // .catch(err => console.log(err))
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
    })
    .then(res => res.json())
    // .then((response => response.json()))
    // .then((res) => {
    //   if (res){
    //     localStorage.getItem(res.email);
    //     return res.email;
    //   }
    // })
    .catch(err => console.log(err))
  };