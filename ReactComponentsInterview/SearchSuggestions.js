var FAILURE_COEFF = 10;
var MAX_SERVER_LATENCY = 2000;
function getRandomBool(n) {
  var maxRandomCoeff = 1000;
  if (n > maxRandomCoeff) n = maxRandomCoeff;
  return Math.floor(Math.random() * maxRandomCoeff) % n === 0;
}

function getSuggestions(text) {
  var pre = "pre";
  var post = "post";
  var results = [];
  if (getRandomBool(2)) {
    results.push(pre + text);
  }
  if (getRandomBool(2)) {
    results.push(text);
  }
  if (getRandomBool(2)) {
    results.push(text + post);
  }
  if (getRandomBool(2)) {
    results.push(pre + text + post);
  }
  return new Promise((resolve, reject) => {
    var randomTimeout = Math.random() * MAX_SERVER_LATENCY;
    setTimeout(() => {
      if (getRandomBool(FAILURE_COEFF)) {
        reject();
      } else {
        resolve(results);
      }
    }, randomTimeout);
  });
}

// input
// change handler -> on change , we capture the text, and call the api
// on getting response from the server, we populate the suggestion list
// suggestion list is a list of items (clickable)
// on click of suggestion list item -> we replace input contents & close the dropdown

// Some aspects:
// 1. wait period before firing requests. (optimization 1)
// 2. r1 10s to respond, r2 - 5s to respond -> out of order responses, would need cancellation of previous one.
// 3. optimizing search renders (by memoizing etc)

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <SearchInput apiFn={getSuggestions} />
    </div>
  );
}
