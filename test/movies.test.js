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
} = require("./../server/mocks/DBMocks");

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

describe("DELETE /movies/:id", () => {
  it("should remove movie with given id", done => {
    request(app)
      .delete("/movies/tt0486592")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(response => {
        expect(response.body.movie.Title).to.equal("Guardians");
      })
      .end(done);
  });

  it("should not remove any movie when invalid id passed", done => {
    request(app)
      .get(`/movies/n0t1D45ure`)
      .expect(404)
      .end(done);
  });
});
