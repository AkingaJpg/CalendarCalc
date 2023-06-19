
function calculateInterval() {
    let startDateInput = document.getElementById('start-date').value;
    let endDateInput = document.getElementById('end-date').value;
  
    let startDate = new Date(startDateInput);
    let endDate = new Date(endDateInput);
    
    let timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
    let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    document.getElementById("result").innerHTML = `The time interval is ${days} days.`;
}