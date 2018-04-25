function request(path, method = 'get', body = null) {
  let bearerToken = ''
  const token = localStorage.getItem('token')

  if(token){
    bearerToken = `Bearer ${token}`
  }

  return axios(`http://localhost:3000${path}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': bearerToken
    },
    data: body
  })
}


function appendChildrenArray(parent, childrenArray){
  childrenArray.reduce((parentNode, child) => {
    parentNode.appendChild(child)
    return parentNode
  }, parent)
  return parent
}
function empty(element){
  while(element.firstChild){
    element.removeChild(element.firstChild);
  }
  return element
}

function renderAccountMenu(){
  empty(accountMenu)
  accountMenu.appendChild(accountCreator)
  request(`/auth/token`)
  .then(function(token){
    return request(`/users/${token.data.id}/accounts`)
    })
    .then(accounts => {
      console.log(accounts);
      for (var account of accounts.data){
        let accountName = account.NameOfAccount
        let id = account.id
        let accountLink = document.createElement('a')
        accountLink.classList.add('dropdown-item')
        accountLink.innerHTML = accountName
        accountLink.addEventListener('click', event => {
          currentAcc.innerHTML = ''
          currentAcc.innerHTML = accountName
          localStorage.setItem('currentAcc', id)
        })
        accountMenu.appendChild(accountLink)
      }
    })
    .catch(function(error){
      console.log(error);
    })
}
