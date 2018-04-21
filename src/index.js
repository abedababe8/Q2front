const signInForm = document.querySelector('.form-signin')
const createAcc = document.querySelector('.createAcc')
const createAccForm = document.querySelector('.form-createAcc')
const signinButton = document.querySelector('.signinButton')


signinButton.addEventListener('click', function(event){
  $(signInForm).toggleClass('hide')
  $(createAccForm).toggleClass('hide')
})
createAcc.addEventListener('click', function(event){
  $(signInForm).toggleClass('hide')
  $(createAccForm).toggleClass('hide')
})
