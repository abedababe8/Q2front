//pie
function renderPie(){
  var ctxP = document.getElementById("pieChart").getContext('2d');
  request(`/auth/token`)
  .then(function(token){
    const account_id = localStorage.getItem('currentAcc')
    return request(`/users/${token.data.id}/accounts/${account_id}/transactions`)
  })
  .then(function(data){
    // console.log(data.data.data);
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
        uniqueAmnts[current] = uniqueAmnts[current] - transaction.ammount
      }
    }
  })


var myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
        labels: uniqueTagNames,
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
}
