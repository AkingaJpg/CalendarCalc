/**second input is after the first input +
 * presets: week, month +
 * options: all days, work days, weekends
 * options2: calculate days, hours, minutes, seconds +
 * localStorage last 10 results
 * responsive +
 * GithubPages
 */


"use strict"

const startDateInput = document.getElementById('start-date');
const endDateInput = document.getElementById('end-date');
const unitElement = document.getElementById('unit');
const dayFilterElement = document.getElementById('dayFilter');
const resultElement = document.getElementById('result');

startDateInput.addEventListener('change', setMin);
endDateInput.addEventListener('change', setMax);

function setMin() {
  endDateInput.setAttribute('min', startDateInput.value);
}
function setMax () {
  startDateInput.setAttribute('max', endDateInput.value);
}

function presetWeek() {
  const startDate = new Date(startDateInput.value);
  startDate.setDate(startDate.getDate() + 7);
  endDateInput.valueAsNumber = startDate;
}

function presetMonth() {
  const startDate = new Date(startDateInput.value);
  startDate.setMonth(startDate.getMonth() + 1);
  endDateInput.valueAsNumber = startDate;
}

function selectPreset(unit) {
  unitElement.value = unit;
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

  const startDate = new Date(startDateInput.value);
  const endDate = new Date(endDateInput.value);
  const dayFilter = dayFilterElement.value;
  const unit = unitElement.value;

  if (startDate > endDate) {
    resultElement.innerHTML = "The end date needs to be bigger then the start date.";
    return;
  }

  if (dayFilter !== 'all' && unit !== 'month' && unit !== 'week') {
    resultElement.innerHTML = "You can not combine weekdays/weekenddays with month and weeks :(";
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

  let result = 0;
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
  resultElement.innerHTML = `The time interval is ${result} ${unit}.`;
  pushToLocalStorage(resultElement.innerHTML);
}





