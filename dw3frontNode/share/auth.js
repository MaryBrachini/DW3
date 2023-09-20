const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    email: "aluno@ifsp.edu.br",
  },
];


module.exports = function (passportPar) {
  function findUser(usernamePar) {
    return users.find((user) => user.username === usernamePar);
  }

  function findUserById(idPar) {
    return users.find((user) => user.id === idPar);
  }
  passportPar.serializeUser((userPar, done) => {
    done(null, userPar.id);
  });

  passportPar.deserializeUser((idPar, done) => {
    try {
      const user = findUserById(idPar);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passportPar.use(
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        try {
          const user = findUser(username);

          // usuário inexistente
          if (!user) {
            return done(null, false);
          }

          // comparando as senhas
          const isValid = bcrypt.compareSync(password, user.password);
          if (!isValid) return done(null, false);

          return done(null, user);
        } catch (err) {
          done(err, false);
        }
      }
    )
  );
};
