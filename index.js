import reddit from './redditapi';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchForm.addEventListener('submit', e => {
  // Get sort
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;
  // Get limit
  const searchLimit = document.getElementById('limit').value;
  // Get search
  const searchTerm = searchInput.value;
  // Check for input
  if (searchTerm == '') {
    // Show message
    showMessage('Please add a search term', 'alert-danger');
  }
  // Clear field
  searchInput.value = '';

  // Search Reddit
  reddit.search(searchTerm, searchLimit, sortBy).then(results => {
    let output = '<div class="card-columns">';
    console.log(results);
    results.forEach(post => {
      // Check for image
      let image = post.preview
        ? post.preview.images[0].source.url
        : 'https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg';
      output += `
      <div class="card mb-2">
      <img class="card-img-top" src="${image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${truncateString(post.selftext, 100)}</p>
        <a href="${post.url}" target="_blank
        " class="btn btn-primary">Read More</a>
        <hr>
        <span class="badge badge-secondary">Subreddit: ${post.subreddit}</span> 
        <span class="badge badge-dark">Score: ${post.score}</span>
      </div>
    </div>
      `;
    });
    output += '</div>';
    document.getElementById('results').innerHTML = output;
  });

  e.preventDefault();
});



//show message 
function showMessage(message, className) {
    //create div 
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent container 
    const searchContainer = document.getElementById('search-container');
    //get search
    const search = document.getElementById('search');    //insert message
    searchContainer.insertBefore(div, search);

    //timeout 
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

//truncate string
function truncateString(myString, limit) {
    const shortened = myString.indexOf(' ', limit);
    if (shortened == -1) return myString;
    return myString.substring(0, shortened);
  }