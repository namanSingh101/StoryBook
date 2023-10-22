const Story = require("../models/Story");

const addStory = (req, res) => {
  return res.render("stories/add");
};
const storyDataSave = async (req, res) => {
  try {
    req.body.user = req.user._id;
    if (!req.body) {
      return res.render("errors/404", {
        resource: "Story Body",
      });
    }
    if (
      !req.body.title ||
      !req.body.status ||
      !req.body.body ||
      !req.body.user
    ) {
      return res.render("errors/404", {
        resource: "Story Body",
      });
    }
    req.body.body = req.body.body.replace(/&nbsp;/g, "");
    req.body.title = req.body.title.replace(/&nbsp;/g, "");
    await Story.create(req.body);
    return res.redirect("/dashboard");
  } catch (error) {
    return res.render("errors/500");
  }
};

const getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user") //populate is used to populate a specific foreign field from other model
      .sort({ createdAt: "desc" })
      .lean(); //it is used mainly for providing mongoose data to template
    // console.log(req.user);
    // console.log(stories);
    return res.render("stories/index", {
      stories,
      req,
    });
  } catch (error) {
    console.log(error);
    return res.render("errors/500");
  }
};

//this is to edit story
const editStory = async (req, res) => {
  try {
    const story = await Story.findById({ _id: req.params.id }).lean();
    console.log(story);
    if (!story) {
      return res.render("errors/404");
    }
    if (story.user.toString() != req.user._id.toString()) {
      return res.redirect("/stories");
    } else {
      return res.render("stories/edit", {
        story,
      });
    }
  } catch (error) {
    return res.render("errors/500");
  }
};

//to save edit story /stories/:id
const saveEditStory = async (req, res) => {
  try {
    if (!req.body.title || !req.body.body) {
      return res.render("errors/404", {
        resource: "Story title or body",
      });
    }
    //check for story
    const story = await Story.findById({ _id: req.params.id });
    if (story.user.toString() != req.user._id.toString()) {
      return res.redirect("/");
    }
    if (!story) {
      return res.render("errors/404", {
        resource: "Story",
      });
    } else {
      const newStory = await Story.findByIdAndUpdate(
        { _id: req.params.id },
        req.body,
        {
          returnDocument: "after",
          lean: true,
          upsert: true,
          runValidators: true,
        }
      );
      return res.redirect("/");
    }
  } catch (error) {
    return res.render("errors/500");
  }
};

const getStory = async (req, res) => {
  
  try {
    if (!req.params.id) {
      return res.render("errors/404", {
        resource: "Id not found",
      });
    }
    const story = await Story.findById(req.params.id).populate("user").lean();
    if (!story) {
      return res.render("errors/500");
    } else {
      
      return res.render("stories/showStory", {
        story,
        req,
      });
    }
  } catch (error) {
    return res.render("errors/500");
  }
};

const moreStory = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.render("errors/404", {
        resource: "User id not found",
      });
    }
    const stories = await Story.find({ user: req.params.id })
      .populate("user")
      .lean();
    return res.render("stories/index", {
      stories,
      req,
    });
  } catch (error) {
    return res.render("errors/500");
  }
};

const deleteStory = async(req, res) => {
  try {
   await  Story.findByIdAndDelete(req.params.id)
   return res.redirect('/dashboard')
  } catch (error) {
    return res.render("errors/500");
  }
};
module.exports = {
  addStory,
  storyDataSave,
  getAllStories,
  editStory,
  saveEditStory,
  getStory,
  moreStory,
  deleteStory,
};
