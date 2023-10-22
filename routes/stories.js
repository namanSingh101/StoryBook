const express = require("express");
const Router = express.Router();
const {
  addStory,
  storyDataSave,
  getAllStories,
  editStory,
  saveEditStory,
  getStory,
  moreStory,
  deleteStory,
} = require("../controllers/stories");
const { ensureAuth } = require("../middleware/auth");

Router.get("/add", ensureAuth, addStory);
Router.post("/", ensureAuth, storyDataSave);
//show all stories
Router.get("/", ensureAuth, getAllStories);
Router.get("/edit/:id", ensureAuth, editStory);
//Router.put("/:id",ensureAuth,saveEditStory)
Router.route("/:id").put(ensureAuth, saveEditStory).get(ensureAuth, getStory);
Router.get("/user/:id", ensureAuth, moreStory);
Router.delete("/:id", ensureAuth, deleteStory);

module.exports = Router;
