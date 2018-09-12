const request = require("supertest");
const expect = require("chai").expect;
const { app } = require("./../server/server");
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
  it("should add a new movie", () => {});

  it("should not add a movie with invalid title", () => {});
});

describe("GET /movies", () => {
  it("should get all movies", () => {});
});

describe("POST /comments", () => {
  it("should add a new comment", () => {});

  it("should not add a comment with invalid movie id", () => {});
});

describe("GET /comments", () => {
  it("should get all comments", () => {});
});

describe("GET /comments/:id", () => {
  it("should get all comments about the movie", () => {});

  it("should not get comments when invalid movie id passed", () => {});
});
