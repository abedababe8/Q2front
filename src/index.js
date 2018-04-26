
(function() {
  'use strict';

  request('/auth/token')
  .then(function(response){
    // user is authenticated

  })
  .catch(function(error){
    // user is not authenticated
  })

const signInForm = document.querySelector('.form-signin')

  // login form
  signInForm.addEventListener('submit', function(event){
    event.preventDefault()

    const username = event.target.username.value
    const password = event.target.password.value

    request('/auth/token', 'post', { username , password })
    .then(function(response){
      document.querySelector('#error').classList.add('hide-auth-error')
      localStorage.setItem('token', response.data.token)
      window.location = '/dashboard.html'
    })
    .catch(function(error){
      document.querySelector('#error').classList.remove('hide-auth-error')
    })
  })
})();

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

const signInForm = document.querySelector('.form-signin')

const createAcc = document.querySelector('.createAcc')
const createAccForm = document.querySelector('.form-createAcc')
const signinButton = document.querySelector('.signinButton')


// setInterval(function(){
//   $('#fade-filler').css('opacity', '0')
// }, 2000)


signinButton.addEventListener('click', function(event){
  $(signInForm).toggleClass('hide')
  $(createAccForm).toggleClass('hide')
})
createAcc.addEventListener('click', function(event){
  $(signInForm).toggleClass('hide')
  $(createAccForm).toggleClass('hide')
})
