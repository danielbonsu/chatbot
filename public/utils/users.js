const users = [];

const userJoin = (newUser) => {
  users.push(newUser);

  console.log(`${newUser.username} added to user list`);
  return newUser;
};

// get current user

const getCurrentUser = (id) => {
  return users.find(user => user.id == id)
}


// user leaves

const userLeave = (id) => {
  const index = users.findIndex(user => user.id == id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }

}

module.exports = { userJoin, userLeave, getCurrentUser };



