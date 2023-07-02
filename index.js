/**second input is after the first input +
 * presets: week, month +
 * options: all days, work days, weekends
 * options2: calculate days, hours, minutes, seconds +
 * localStorage last 10 results
 * responsive +
 * GithubPages
 */


"use strict"
function selectPreset(unit) {
  document.getElementById('unit').value = unit;
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6 ? 1 : 0;
}
function isWeekday(date) {
  const day = date.getDay();
  return day === 0 || day === 6 ? 0 : 1;
}

function calculateDifference(start, end, filterFunc) {
  let counter = 0;
  for (let currentDate = new Date(start); currentDate < end; currentDate.setDate(currentDate.getDate() + 1)) {
    counter += filterFunc(currentDate);
  }
  return counter;
}

function showOldResults() {
  const element = document.getElementById("oldResults");
  element.innerHTML = readFromLocalStorage().join("<br/>");
}

function readFromLocalStorage() {
  return JSON.parse(localStorage.getItem("result") ?? "[]");
}
function pushToLocalStorage(result) {
  const stuff = [result, ...readFromLocalStorage()].filter((_, i) => i < 10);
  localStorage.setItem("result", JSON.stringify(stuff))
}

function calculateInterval() {

  const startDateInput = document.getElementById('start-date').value;
  const endDateInput = document.getElementById('end-date').value;
  const unit = document.getElementById('unit').value;
  const dayFilter = document.getElementById('dayFilter').value;

  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (startDate > endDate) {
    document.getElementById("result").innerHTML = "The end date needs to be bigger then the start date.";
    return;
  }

  if (dayFilter !== 'all' && unit !== 'month' && unit !== 'week') {
    document.getElementById("result").innerHTML = "You can not combine weekdays/weekenddays with month and weeks :(";
    return;
  }
 

  let filterFunc;
  switch (dayFilter) {
    case 'all':
      filterFunc = () => 1;
      break;
    case 'weekdays':
      filterFunc = isWeekday;
      break;
    case 'weekenddays':
      filterFunc = isWeekend;
      break;
    default:
      throw "meh";
  }

  const daysDiff = calculateDifference(startDate, endDate, filterFunc);

  switch (unit) {
    case 'months':
      result = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
      break;
    case 'weeks':
      result = Math.floor(daysDiff / 7);
      break;
    case 'days':
      result = Math.floor(daysDiff);
      break;
    case 'hours':
      result = Math.floor(daysDiff * 24);
      break;
    case 'minutes':
      result = Math.floor(daysDiff * 24 * 60);
      break;
    case 'seconds':
      result = Math.floor(daysDiff * 24 * 60 * 60);
      break;
    default:
      result = 'Invalid unit';
      break;
  }
  showOldResults();
  document.getElementById("result").innerHTML = `The time interval is ${result} ${unit}.`;
  pushToLocalStorage(document.getElementById("result").innerHTML);
}





