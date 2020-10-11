const users = [];

const userJoin = (newUser) => {
  users.push(newUser);

  console.log('new user added', newUser);
  return newUser;
};

module.exports = userJoin;
