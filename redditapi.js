export default {
    search: function(searchTerm, searchLimit, sortBy) {
        console.log('searching ... ')
        fetch(`http://wwww.reddit.com/search.json?q=${searchTerm}`)
        .then(res => res.json())
        .then(data => console.log(data));
    }
}