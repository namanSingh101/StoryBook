const { NotFound } = require("../errors");
const Story = require("../models/Story");

const login = (req, res) => {
  //throw new NotFound("Page Not found")
  return res.render("login", {
    layout: "login",
  });
};

const dashboard = async (req, res) => {
  try {
    //so to use that mongoose object in handlebars we have to lean option
    const stories = await Story.find({ user: req.user._id }).lean();
    //console.log(req.user);
    return res.render("dashboard", {
      name: req.user.firstName,
      stories,
    });
  } catch (error) {
    //throw new NotFound("Stories not found");
    res.render("errors/500");
  }
};

module.exports = { login, dashboard };
