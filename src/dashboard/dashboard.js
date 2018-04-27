const accountDropDown = document.getElementById('accountDropdown')
const accountMenu = document.querySelector('.dropdown-menu')
const accountCreator = document.createElement('a')

const createAccForm = document.querySelector('.form-createAcc')
const transactionForm = document.querySelector('.form-createTransaction')
const addUser = document.querySelector('.form-addUser')

const tagSelector = document.getElementById('tag')
const typeSelector = document.getElementById('type')

const currentAcc = document.getElementById('currentAcc')
const account_id = localStorage.getItem('currentAcc')

const showAll = document.querySelector('#showAll')

const chartContainer = document.querySelector('#chartContainer')

const doughnutButton = document.querySelector('#doughnutButton')
const doughnutChart = document.querySelector('#doughnutChart')
const barButton = document.querySelector('#barButton')
const barChart = document.querySelector('#barChart')

let whichChart = 1

const log = document.getElementById('log')



request('/auth/token')
.then(function(token){
  return request(`/users/${token.data.id}/tags`)
})
  .then(function(response){
      // const tags = response.data.map(tag => tag.name)
      // console.log(tags);
      let tagOptions = response.data.forEach(tag => {
          const option = document.createElement('option')
          option.innerHTML = tag.name
          option.setAttribute('value', tag.id)
          tagSelector.appendChild(option)
      })
      // return
  })
request(`/auth/token`)
.then(function(token){
  return request(`/users/${token.data.id}/accounts`)
  })
  .then(function(accounts){
    let foundAccount = accounts.data.find(account => {
      return account.id === Number(account_id)
    })
    if(foundAccount){
      localStorage.setItem('currentAcc', foundAccount.id)
      currentAcc.innerHTML = foundAccount.NameOfAccount
    } else {
      localStorage.setItem('currentAcc', accounts.data[0].id)
      currentAcc.innerHTML = accounts.data[0].NameOfAccount
    }
    if(whichChart === 1){
      renderDoughnut()
    } else if (whichChart === 2){
      renderBar()
    } else {
      renderPie()
    }
  })

accountCreator.classList.add('dropdown-item')
accountCreator.setAttribute('target', '_blank')
accountCreator.setAttribute('data-toggle', 'modal')
accountCreator.setAttribute('data-target', '#createAccModal')
accountCreator.setAttribute('data-whatever', '@getbootstrap')
accountCreator.innerHTML = 'Add Account'



createAccForm.addEventListener('submit', function(event){
  event.preventDefault()
  const accName = event.target.accountName.value
  request(`/auth/token`)
  .then(function(token){
    return request(`/users/${token.data.id}/accounts`, 'post', { accName })
    })
    .then(function(newAcc){
      console.log(newAcc);
    localStorage.setItem('currentAcc', newAcc.data[0].id)
    renderAccountMenu()
    if(whichChart === 1){
      renderDoughnut()
    } else if (whichChart === 2){
      renderBar()
    } else {
      renderPie()
    }
  })
})


accountDropDown.addEventListener('click', function(event){
  renderAccountMenu()
})

transactionForm.addEventListener('submit', function(event){
  event.preventDefault()
  const amnt = event.target.amnt.value
  event.target.amnt.value = ''
  const tag = event.target.tag.value
  event.target.tag.value = ''
  const deposit = event.target.deposit.value
  event.target.deposit.value = ''
  const memo = event.target.memo.value
  event.target.memo.value = ''
  console.log(amnt, tag, deposit, memo);

  request(`/auth/token`)
  .then(function(token){
    return request(`/users/${token.data.id}/accounts/${account_id}/transactions`, 'post', {tag, memo, deposit, amnt})
  })
  .then(function(data){
    whichChart ? renderDoughnut() : renderBar()
    $('#createTransactionModal').modal('hide')
  })
})

addUser.addEventListener('submit', function(event){
  event.preventDefault()
  const findUser = event.target.findUser.value
  console.log(findUser);
  request(`/auth/token`)
  .then(function(token){
    return request(`/users/${token.data.id}/accounts/${account_id}/userAcc`, 'post', {findUser})
  })
  .then(function(data){
    console.log(data);
    $('#addUserModal').modal('hide')
  })
})

log.addEventListener('click', function(){
  renderTransactionList()
})

barButton.addEventListener('click', function(event){
  // doughnutChart.style.display = 'none'
  // console.log(  doughnutChart.style.display)
  document.querySelector('#barContainer').classList.remove('hide')
  document.querySelector('#doughnutContainer').classList.add('hide')
  document.querySelector('#pieContainer').classList.add('hide')

  whichChart = 2
  if(whichChart === 1){
    renderDoughnut()
  } else if (whichChart === 2){
    renderBar()
  } else {
    renderPie()
  }
})
doughnutButton.addEventListener('click', function(event){
  // barChart.style.display = 'none'
  document.querySelector('#doughnutContainer').classList.remove('hide')
  document.querySelector('#barContainer').classList.add('hide')
  document.querySelector('#pieContainer').classList.add('hide')

  whichChart = 1
  if(whichChart === 1){
    renderDoughnut()
  } else if (whichChart === 2){
    renderBar()
  } else {
    renderPie()
  }
})
pieButton.addEventListener('click', function(event){
  // doughnutChart.style.display = 'none'
  // console.log(  doughnutChart.style.display)
  document.querySelector('#barContainer').classList.add('hide')
  document.querySelector('#doughnutContainer').classList.add('hide')
  document.querySelector('#pieContainer').classList.remove('hide')

  whichChart = 3
  if(whichChart === 1){
    renderDoughnut()
  } else if (whichChart === 2){
    renderBar()
  } else {
    renderPie()
  }
})



// request('/accounts', 'post', { name })
// .then(function(account){
//
// })
