const accountDropDown = document.getElementById('accountDropdown')
const accountMenu = document.querySelector('.dropdown-menu')
const accountCreator = document.createElement('a')
const createAccForm = document.querySelector('.form-createAcc')
const transactionForm = document.querySelector('.form-createTransaction')
const tagSelector = document.getElementById('tag')
const typeSelector = document.getElementById('type')
const currentAcc = document.getElementById('currentAcc')

const account_id = localStorage.getItem('currentAcc')

const log = document.getElementById('log')



request('/auth/token')
.then(function(token){
  return request(`/users/${token.data.id}/tags`)
})
  .then(function(response){
    console.log(response);
      // const tags = response.data.map(tag => tag.name)
      // console.log(tags);
      let tagOptions = response.data.forEach(tag => {
          const option = document.createElement('option')
          option.innerHTML = tag.name
          option.setAttribute('value', tag.id)
          tagSelector.appendChild(option)
      })
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
  console.log(accName, 1);
  request(`/auth/token`)
  .then(function(token){
    console.log(accName, 2);
    return request(`/users/${token.data.id}/accounts`, 'post', { accName })
    })
    .then(function(newAcc){

    console.log('in the database');
    renderAccountMenu()
  })
})


accountDropDown.addEventListener('click', function(event){
  renderAccountMenu()
})

transactionForm.addEventListener('submit', function(event){

  event.preventDefault()
  const amnt = event.target.amnt.value
  const tag = event.target.tag.value
  const deposit = event.target.deposit.value
  const memo = event.target.memo.value
  console.log(amnt, tag, deposit, memo);

  request(`/auth/token`)
  .then(function(token){
    return request(`/users/${token.data.id}/accounts/${account_id}/transactions`, 'post', {tag, memo, deposit, amnt})
  })
  .then(function(data){
    console.log(data);
  })
})









// request('/accounts', 'post', { name })
// .then(function(account){
//
// })
