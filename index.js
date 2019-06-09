import reddit from './redditapi.js';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', e => {
    //get search term 
    const searchTerm = searchInput.value;
    console.log(searchTerm);
    //get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    //get limit
    const searchLimit = document.getElementById('limit').value;
    console.log(searchLimit)

    //check inpput
    if(searchTerm === ''){
        showMessage('Input is empty. Please add a search term.', 'alert-danger');
    }

    //clear input 
    searchInput.value = '';

    //search Reddit 
    reddit.search(searchTerm, searchLimit, sortBy);

    e.preventDefault();
});

//show message 
function showMessage(message, className){
    //create div 
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    //add text
    div.appendChild(document.createTextNode(message));
    //get parent container 
    const searchContainer = document.getElementById('search-container');
    //get search
    const search = document.getElementById('search');
    console.log('sup')
    //insert message
    searchContainer.insertBefore(div, search);

    //timeout 
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}