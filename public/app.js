const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');


userForm.addEventListener('submit', async (e) => {               // Eventlistener --> Benutzerdaten zu Senden
  e.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const age = document.getElementById('age').value;

  const response = await fetch('http://localhost:3000/api/users', {    // POST-Anfrage --> API
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, age })
  });

  const user = await response.json(); // Konvertiert zu json
  addUserToList(user);
  userForm.reset();
});

function addUserToList(user) {
  const li = document.createElement('li');
  li.textContent = `${user.firstName} ${user.lastName}, Age: ${user.age}`;  // Json editieren
  li.dataset.id = user.id;

  const editButton = document.createElement('button');  // Editier Button
  editButton.textContent = 'Edit';
  editButton.onclick = () => editUser(user.id);

  li.appendChild(editButton);
  userList.appendChild(li);
}

async function fetchUsers() { // Abrufen Users
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();
  users.forEach(addUserToList);
}

async function editUser(id) {  // Werte Ändern
  const firstName = prompt('New Firstname:');
  const lastName = prompt('New Lastname:');
  const age = prompt('New Age:');

  if (firstName && lastName && age) {
    const response = await fetch(`http://localhost:3000/api/users/${id}`, { // PUT Anfrage zum userhinzufügen
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, age })
    });

    const updatedUser = await response.json();      // aktualiserung
    const userItem = document.querySelector(`li[data-id='${id}']`);
    userItem.firstChild.textContent = `${updatedUser.firstName} ${updatedUser.lastName}, Age: ${updatedUser.age}`;
  }
}

async function deleteUser(id) {
  const response = await fetch(`http://localhost:3000/api/users/${id}`, { // User löschen
    method: 'DELETE'
  });

  if (response.ok) {
    const userItem = document.querySelector(`li[data-id='${id}']`);
    userItem.remove();
  }
}

function addUserToList(user) {
  const li = document.createElement('li');      // Delete button
  li.textContent = `${user.firstName} ${user.lastName}, Age: ${user.age}`;
  li.dataset.id = user.id;

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.onclick = () => editUser(user.id);

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.onclick = () => deleteUser(user.id);

  li.appendChild(editButton);
  li.appendChild(deleteButton);
  userList.appendChild(li);
}

// Alle user
fetchUsers();
