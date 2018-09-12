const request = require("supertest");
const expect = require("chai").expect;
const app = require("./../server/server");
const { Movie } = require("./../server/models/Movie");
const { Comment } = require("./../server/models/Comment");
const {
  movies,
  comments,
  addMovies,
  addComments
} = require("./../mocks/DBMocks");

beforeEach(addMovies);
beforeEach(addComments);

describe("POST /movies", () => {
  it("should add a new movie", done => {
    const title = "Titanic";

    request(app)
      .post("/movies")
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
      .expect(200)
      .expect(response => {
        expect(response.body.movies.length).to.equal(2);
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
