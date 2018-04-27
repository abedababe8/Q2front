function renderBar(){
var ctxB = document.getElementById("barChart").getContext('2d');
  request(`/auth/token`)
  .then(function(token){
    const account_id = localStorage.getItem('currentAcc')
    return request(`/users/${token.data.id}/accounts/${account_id}/transactions`)
  })
  .then(function(data){
    let uniqueTags = []
    let uniqueTagNames = []
    let uniqueAmnts = []

    let allTransactions = data.data.data
    let allTags = allTransactions.map(transaction => {
      if(uniqueTags.indexOf(transaction.tag_id) === -1){
        switch (transaction.tag_id) {
          case 1:
            uniqueTagNames.push("Not Specified")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 2:
            uniqueTagNames.push("Auto")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 3:
            uniqueTagNames.push("Income")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 4:
            uniqueTagNames.push("Gift")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 5:
            uniqueTagNames.push("Grocery")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 6:
            uniqueTagNames.push("School")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 7:
            uniqueTagNames.push("Work")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 8:
            uniqueTagNames.push("Fun")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 9:
            uniqueTagNames.push("Custom")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          case 10:
            uniqueTagNames.push("Rent")
            uniqueTags.push(transaction.tag_id)
            uniqueAmnts.push(transaction.ammount);
          break;
          default:
          console.log('uh oh!');
        }
    } else if (uniqueTags.indexOf(transaction.tag_id) !== -1) {
      let current = uniqueTags.indexOf(transaction.tag_id)
      if (transaction.deposit === true){
        uniqueAmnts[current] += transaction.ammount
      } else {
        console.log(uniqueAmnts, uniqueAmnts[current], current, transaction.ammount);
        uniqueAmnts[current] = uniqueAmnts[current] - transaction.ammount
      }
    }
  })



  var myBarChart = new Chart(ctxB, {
      type: 'bar',
      data: {
          labels: uniqueTagNames,
          datasets: [{
              label: 'Dollars in Category',
              data: uniqueAmnts,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
  })
}
