var ctxD = document.getElementById("doughnutChart").getContext('2d');
let chartType = 'doughnut'

log.addEventListener('click', function(event){
  request(`/auth/token`)
  .then(function(token){
    const account_id = localStorage.getItem('currentAcc')
    return request(`/users/${token.data.id}/accounts/${account_id}/transactions`)
  })
  .then(function(data){
    console.log(data.data.data);
    let uniqueTags = []
    let uniqueAmnts = []

    let allTransactions = data.data.data
    let allTags = allTransactions.map(transaction => {
      if(uniqueTags.indexOf(transaction.tag_id) === -1){
      uniqueTags.push(transaction.tag_id)
      uniqueAmnts.push(transaction.ammount)
    } else if (uniqueTags.indexOf(transaction.tag_id) !== -1) {
      let current = uniqueTags.indexOf(transaction.tag_id)
      if (transaction.deposit === true){
        uniqueAmnts[current] += transaction.ammount
      } else {
        uniqueAmnts[current] -= transaction.ammount
      }
    }
  })



    var myLineChart = new Chart(ctxD, {
        type: chartType,
        data: {
            labels: uniqueTags,
            datasets: [
                    {
                    data: uniqueAmnts,
                    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870", "#A8B3C5", "#616774"]
                    }
                      ]
              },
        options: {
            responsive: true
        }
    });
  })
})
