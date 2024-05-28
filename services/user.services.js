let users = [];
let currentId = 1;

function getAllUsers() { 
  return users;
}

function addUser(user) {
  user.id = currentId++;
  users.push(user);
}

function updateUser(id, updatedUser) {
  const index = users.findIndex(user => user.id == id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedUser };
  }
}

function deleteUser(id) {
  users = users.filter(user => user.id != id);
}

module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser
};
