const ulStart = '<ul>';
const ulEnd = '</ul>';
const liStart = '<li>';
const liEnd = '</li>';
const apiUrl = 'https://jsonplaceholder.typicode.com/users';


function renderList(selector, users, key) {

  let divElement = document.querySelector(selector);

  divElement.innerHTML = functionPrintUserInfos(users, key);

}

function functionPrintUserInfos(users, key) {
  let list = ulStart;

  users.forEach((user) => { // for each element in the array, user is the current element
    list += liStart;

    if (key === 'name') {
      list += user.name;
    } else {
      list += user.email;
    }

    list += liEnd;
  });

  return list + ulEnd;
}

function getUsersEmails() {
  let request = new XMLHttpRequest();

  request.open('GET', apiUrl);
  request.onload = function() {

    if (request.status === 200) {
      let users = JSON.parse(request.response);

      users.sort(function(a, b){
        if (a.email < b.email) { return -1; }
        if (a.email > b.email) { return 1; }
        return 0;
      });


      renderList('#userEmails', users, 'email');
    } else {
      alert('Error');
    }

  };

  request.send();
}

function getUsersNames() {
  fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (users) {

        users.sort(function(a, b){
          if (a.name.length < b.name.length) { return -1; }
          if (a.name.length > b.name.length) { return 1; }
          return 0;
        });

        renderList('#userNames', users, 'name');
      })
      .catch(error => alert(error));

}


function renderLists() {

  getUsersEmails();

  getUsersNames();
  // render first list
  //renderList('#userInfos1', org1_depts);

  // render second list
  //renderList('#userInfos2', org2_depts);

}

renderLists();