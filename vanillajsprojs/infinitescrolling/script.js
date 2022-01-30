console.log('hello world!');

const postsContainer = document.getElementById('post-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

const limit = 6;
let page = 1;

async function getPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();
    return data;
}

async function showPosts() {
    const posts = await getPosts();
    console.log('data = ');
    console.log(posts);

    posts.forEach(post => {
        const postEl = createPostHtmlFromPayload(post);
        postsContainer.appendChild(postEl);
    });
}

function createPostHtmlFromPayload(post) {
    const postEl = document.createElement('div');
    postEl.classList.add('post');

    const postIdNumber = document.createElement('div');
    postIdNumber.classList.add('number');
    postIdNumber.innerText = post.id;

    const postInfoSection = document.createElement('div');
    postInfoSection.classList.add('post-info');
    const postTitle = document.createElement('h2');
    postTitle.classList.add('post-title');
    postTitle.innerText = post.title;
    const postBody = document.createElement('p');
    postBody.classList.add('post-body');
    postBody.innerText = post.body;
    postInfoSection.appendChild(postTitle);
    postInfoSection.appendChild(postBody);

    postEl.appendChild(postIdNumber);
    postEl.appendChild(postInfoSection);

    return postEl;
}

const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  }
  

showPosts();

function showLoader(){
    document.getElementById('loader').classList.add('show');
}

function hideLoader(){
    console.log('hide loader: ', document.getElementById('loader'));
    document.getElementById('loader').classList.remove('show');
}

function fetchAndHideLoader() {
    console.log('almost reached the bottom, time to fetch again');
    showLoader();
    page++;
    showPosts().then(function(){
        hideLoader();
    });
}

const debouncedfn = debounce(fetchAndHideLoader, 100);

window.addEventListener('scroll', async function(ev ) {
    // console.log('scroll happened!', ev);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    console.log('scrollTop = ', scrollTop, ' scrollHeight = ', scrollHeight, ' clientHeight = ', clientHeight);

    if(scrollTop + clientHeight >= scrollHeight - 50) {
        debouncedfn();
    }
});
