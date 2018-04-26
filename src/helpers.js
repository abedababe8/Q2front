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
          if(whichChart === 1){
            renderDoughnut()
          } else if (whichChart === 2){
            renderBar()
          } else {
            renderPie()
          }
        })
        accountMenu.appendChild(accountLink)
      }
    })
    .catch(function(error){
      console.log(error);
    })
}

function renderTransactionList(){
  empty(showAll)
  request(`/auth/token`)
  .then(function(token){
    const account_id = localStorage.getItem('currentAcc')
    return request(`/users/${token.data.id}/accounts/${account_id}/transactions`)
  })
  .then(function(data){
    let allTransactions = data.data.data
    let name;
    let count = 1
    for (var trans of allTransactions){
      switch (trans.tag_id) {
        case 1:
          name = "Not Specified"
        break;
        case 2:
          name = "Auto"
        break;
        case 3:
          name = "Income"
        break;
        case 4:
          name = "Gift"
        break;
        case 5:
          name = "Grocery"
        break;
        case 6:
          name = "School"
        break;
        case 7:
          name = "Work"
        break;
        case 8:
          name = "Fun"
        break;
        case 9:
          name = "Custom"
        break;
        case 10:
          name = "Rent"
        break;
        default:
        console.log('uh oh!');
      }
      console.log(count);
      const transLi = document.createElement('div')
        transLi.classList.add('list-group-item')
        // if(count % 2 === 1){
        transLi.classList.add('page-footer')
        // } else {
        //   transLi.style.background = 'linear-gradient(to bottom right, #0099ff, #00ffcc);'
        // }
        // count++
      const transLiHead = document.createElement('div')
        transLiHead.classList.add('list-group-item-heading')
        transLiHead.innerHTML = `Ammount: ${trans.ammount}, Deposit: ${trans.deposit}, Tag: ${name}, User: ${trans.user_id}`
      const transLiDel = document.createElement('a')
        transLiDel.classList.add('list-group-item-text')
        transLiDel.innerHTML = 'Delete Transaction'
        transLiDel.style.color = 'red'
        transLiDel.addEventListener('click', event => {
          request(`/auth/token`)
          .then(function(token){
            const account_id = localStorage.getItem('currentAcc')
            return request(`/users/${token.data.id}/accounts/${account_id}/transactions/${trans.id}`, 'delete')
          })
          .then(function(deletedTrans){
            console.log(deletedTrans);
            renderTransactionList()
            if(whichChart === 1){
              renderDoughnut()
            } else if (whichChart === 2){
              renderBar()
            } else {
              renderPie()
            }
          })
          .catch(console.log)
      })
      transLi.appendChild(transLiHead)
      transLi.appendChild(document.createElement('hr'))
      transLi.appendChild(transLiDel)
      showAll.appendChild(transLi)
    }
  })
}

$(document).ready (function () {
 $(window).scroll (function () {
    var sT = $(this).scrollTop();
        if (sT >= 100) {
            $('.title').toggleClass('hide')
            $('.navbar').addClass('lockNav')
        } else {
            $('.title').removeClass('hide')
            $('.navbar').removeClass('lockNav')
        }
  })
})
