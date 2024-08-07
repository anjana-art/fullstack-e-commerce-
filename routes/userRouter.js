const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");


const jwtSecret = " asldkfjlskdjfad this is jwtSecret.";

const {
  createUser,
  authenticateUser,
  forgotPassword,
  resetPassword,
  deactivateUser,
  findUser,
  deleteUser,
  updateUser,
  getAllUsers,
  getUserbyId,
} = require("../services/userService");

const userRouter = express.Router();
const dirname = 'C:\\Users\\bhatt\\OneDrive\\Desktop\\fullstackProject\\fsproj\\api';

userRouter.use('/uploads', express.static(dirname+ '/uploads'));


userRouter.get("", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send({
      status: "success",
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failure",
      data: error,
    });
  }
});

userRouter.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const newUser = await createUser({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      data: error,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { body } = req;
  const { email, password } = req.body;
  const userDoc = await findUser({ email });
  console.log("userDoc ", userDoc);

  if (userDoc) {
    const userToken = await authenticateUser(body);
    console.log("userToken", userToken);

    if (userToken) {
      jsonwebtoken.sign(
        { email: userDoc.email, id: userDoc._id , firstName: userDoc.firstName, lastName: userDoc.lastName},
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token, { httpOnly: true }).json(userDoc);
          console.log("token", token);
        }
      ); //assigning cookie
    } else {
      res.status(422).json("Password doesnot match.");
    }
  } else {
    res.status(422).json("not found");
  }
});

userRouter.get("/profile", (req, res) => {
  try {
    const { token } = req.cookies;

    console.log("req.cookies", { token });

    if (token) {
      jsonwebtoken.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;

        const { firstName, lastName, _id, email } = await getUserbyId(
          userData.id
        );
        res.json({ firstName, lastName, _id, email });
      });
    } else {
      res.json("Not found cookie");
    }
  } catch (err) {
    res.status(422).json(err);
  }
});

userRouter.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

userRouter.put("/:id", async (req, res) => {
  try {
    // const { body } = req;
    const { id } = req.params;
    const { body } = req.body;
    console.log(req.body);

    const user = await updateUser(id, { body });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("user", user);
    res.status(201).json({
      status: "update successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "failure",
      data: error.message,
    });
    console.log(error);
  }
});

userRouter.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    await forgotPassword({ email });
    res.status(201).send();
  } catch (error) {
    res.status(400).send("Error while sending email");
  }
});

userRouter.post("/reset-password", async (req, res) => {
  try {
    const { email, token, password } = req.body;

    await resetPassword({ email, token, password });
    res.status(201).send();
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while changing password");
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserbyId(id);
    res.send({
      status: "success",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failure",
      data: error,
    });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUser(id);
    return res.send({
      status: " user deleted successfully.",
      data: deletedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: "failure",
      data: error,
    });
  }
});

/*userRouter.delete("/:userId", async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).send("No User ID");
  }

  await deactivateUser({ userId });
  return res.send({
    status: "success",
    data: {},
  });
});
*/
console.log({ __dirname });
userRouter.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: dirname + "/uploads/" + newName,
  });
  res.json(dirname + "/uploads/" + newName);
});

const photosMiddleware = multer({ dest: "uploads/" });
userRouter.post(
  "/upload",
  photosMiddleware.array("photos", 100),
  (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { path, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
   
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace('uploads\\',''));
    }
    console.log('uploadedFiles', uploadedFiles);
    res.json(uploadedFiles);
  }
);
module.exports = userRouter;
