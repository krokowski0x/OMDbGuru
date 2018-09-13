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

describe("POST /comments", () => {
  it("should add a new comment", done => {
    const id = "tt0486592";
    const comment = "First!!!!";

    request(app)
      .post("/comments")
      .set("x-auth", users[0].tokens[0].token)
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
      .set("x-auth", users[0].tokens[0].token)
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
      .get("/comments/tt0486592")
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

describe("DELETE /comments/:id", () => {
  it("should remove comment with given id", done => {
    request(app)
      .delete("/comments/5b9948f2fcb585b410012728")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect(response => {
        expect(response.body.comment).to.equal("Hello");
      })
      .end(done);
  });

  it("should not remove any comment when invalid id passed", done => {
    request(app)
      .get(`/comments/n0t1D45ure`)
      .expect(404)
      .end(done);
  });
});
