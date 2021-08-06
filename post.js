const BASE_URL = "https://localhost:5000"

function posts(){
    var title = document.getElementById("title").value;
    var description = document.getElementById("description").value;
    var posts = document.getElementById("post")
    
    const obj = {
        title: title,
        description:description
    }

    const axios = require('axios');

// Make a request for a user with a given ID
axios.post(`${BASE_URL}/create`,obj)
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  
}