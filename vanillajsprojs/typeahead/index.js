const BASE_URL = 'https://www.algoexpert.io/api/fe/glossary-suggestions';

// Write your code here.
const input = document.getElementById('typeahead');
const suggestionsList = document.getElementById('suggestions-list');

function debounce(originalFn, delayMs) {
  let timerId = null;
  return function(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      originalFn(...args);
    }, delayMs);
  }
}

const debouncedFetch = debounce(fetchSuggestions, 500);


input.addEventListener('input', (ev) => {
  const text = ev.target.value;
  if(text && text.trim().length > 0) {
      debouncedFetch(text);
  } else {
      suggestionsList.innerHTML = "";
  }
});

function populateListWithSuggestions(suggestions) {
  suggestionsList.innerHTML = '';
  function createLiElement(text) {
    const liElement = document.createElement('li');
    liElement.textContent = text;
    liElement.addEventListener('click',() => {
      input.value = text;
      suggestionsList.innerHTML = '';
    });
    return liElement;
  }

  const suggestionsElements = suggestions.map(createLiElement);
  suggestionsList.append(...suggestionsElements);
}

function fetchSuggestions(text) {
  const url = new URL(BASE_URL);
  const params = { text };
  const searchParams = new URLSearchParams(params);
  url.search = searchParams;

  fetch(url).then(resp => {
    if(resp.ok) {
      resp.json().then(suggestions => {
        populateListWithSuggestions(suggestions);
      });    
    } 
  })
}