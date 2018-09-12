const request = require("supertest");
const expect = require("chai").expect;
const app = require("./../server/server");
const { Movie } = require("./../server/models/Movie");
const { Comment } = require("./../server/models/Comment");
const { User } = require("./../server/models/User");
const {
  movies,
  comments,
  users,
  addMovies,
  addComments,
  addUsers
} = require("./../mocks/DBMocks");

beforeEach(addMovies);
beforeEach(addComments);
beforeEach(addUsers);

describe("POST /movies", () => {
  it("should add a new movie", done => {
    const title = "Titanic";

    request(app)
      .post("/movies")
      .set("x-auth", users[0].tokens[0].token)
      .send({ title })
      .expect(200)
      .expect(res => {
        expect(res.body.title).to.equal(title);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Movie.find({ title })
          .then(movies => {
            expect(movies.length).to.equal(1);
            expect(movies[0].title).to.equal(title);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should not add a movie with invalid title", done => {
    request(app)
      .post("/movies")
      .set("x-auth", users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end((err, response) => {
        if (err) return done(err);

        Movie.find()
          .then(movies => {
            expect(movies.length).to.equal(2);
            done();
          })
          .catch(err => done(err));
      });
  });
});

describe("GET /movies", () => {
  it("should get all movies", done => {
    request(app)
      .get("/movies")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(response => {
        expect(response.body.movies.length).to.equal(1);
      })
      .end(done);
  });
});

describe("POST /comments", () => {
  it("should add a new comment", done => {
    const id = "tt2015381";
    const comment = "First!!!!";

    request(app)
      .post("/comments")
      .send({ id, comment })
      .expect(200)
      .expect(res => {
        expect(res.body.id).to.equal(id);
        expect(res.body.comment).to.equal(comment);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Comment.find({ id })
          .then(comments => {
            expect(comments.length).to.equal(2);
            expect(comments[1].comment).to.equal(comment);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should not add a comment with invalid movie id", done => {
    const id = "n0t1D45ure";
    const comment = "First!!!!";

    request(app)
      .post("/comments")
      .send({ id, comment })
      .expect(404)
      .end(done);
  });
});

describe("GET /comments", () => {
  it("should get all comments", done => {
    request(app)
      .get("/comments")
      .expect(200)
      .expect(response => {
        expect(response.body.comments.length).to.equal(2);
      })
      .end(done);
  });
});

describe("GET /comments/:id", () => {
  it("should get all comments about the movie", done => {
    request(app)
      .get("/comments/tt2015381")
      .expect(200)
      .expect(response => {
        expect(response.body.comments.length).to.equal(1);
      })
      .end(done);
  });

  it("should not get comments when invalid movie id passed", done => {
    request(app)
      .get(`/comments/n0t1D45ure`)
      .expect(404)
      .end(done);
  });
});

describe("GET /users/me", () => {
  it("should return user if authenticated", done => {
    request(app)
      .get("/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(response => {
        expect(response.body._id).to.equal(users[0]._id.toHexString());
        expect(response.body.username).to.equal(users[0].username);
      })
      .end(done);
  });

  it("should return 401 if not authenticated", done => {
    request(app)
      .get("/users/me")
      .expect(401)
      .expect(response => {
        expect(response.body).to.deep.equal({});
      })
      .end(done);
  });
});

describe("POST /users", () => {
  it("should create a user", done => {
    const username = "exampleUser";
    const password = "123abc!";

    request(app)
      .post("/users")
      .send({ username, password })
      .expect(200)
      .expect(response => {
        expect(response.headers["x-auth"]).to.exist;
        expect(response.body._id).to.exist;
        expect(response.body.username).to.equal(username);
      })
      .end(err => {
        if (err) {
          return done(err);
        }

        User.findOne({ username })
          .then(user => {
            expect(user).to.exist;
            expect(user.password).to.not.equal(password);
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should return validation errors if request invalid", done => {
    request(app)
      .post("/users")
      .send({
        username: "and",
        password: "123"
      })
      .expect(400)
      .end(done);
  });

  it("should not create user if username in use", done => {
    request(app)
      .post("/users")
      .send({
        username: users[0].username,
        password: "Password123!"
      })
      .expect(400)
      .end(done);
  });
});

describe("POST /users/login", () => {
  it("should login user and return auth token", done => {
    request(app)
      .post("/users/login")
      .send({
        username: users[1].username,
        password: users[1].password
      })
      .expect(200)
      .expect(res => {
        expect(res.headers["x-auth"]).to.exist;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens[1]).to.include({
              access: "auth",
              token: res.headers["x-auth"]
            });
            done();
          })
          .catch(err => done(err));
      });
  });

  it("should reject invalid login", done => {
    request(app)
      .post("/users/login")
      .send({
        username: "lel"
      })
      .expect(400)
      .expect(res => {
        expect(res.headers["x-auth"]).to.not.exist;
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id)
          .then(user => {
            expect(user.tokens).to.have.lengthOf(1);
            done();
          })
          .catch(err => done(err));
      });
  });
});

describe("DELETE /users/me/token", () => {
  it("should remove auth token on logout", done => {
    request(app)
      .delete("/users/me/token")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .end((err, response) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id)
          .then(user => {
            expect(user.tokens.length).to.equal(0);
            done();
          })
          .catch(err => done(err));
      });
  });
});
