const User = require("../database/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai"); // CommonJS require instead of import
const { OAuth2Client } = require('google-auth-library');

function generateToken(user) {
  const jwt_secret = process.env.JWT_SECRET;
  return jwt.sign({ id: user._id }, jwt_secret, { expiresIn: 3600 });
}
const getUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById({ _id: id });
    res.json({
      error: "false",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        difficulty: user.difficulty,
        score: user.score,
        answers: user.answers,
        googleId: user.googleId || null, 
      },
    });
  } catch (error) {
    console.log(error);
  }
};
async function verifyPasssword(req,res){
  try{
    const {id}=req.user;
    const password=req.body.password;
    const user=await User.findById({ _id: id });
    console.log(password);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({ message: "wrong" });
    }
    return res.status(200).json({ message: "Login's successful" });
  }catch(err){
    res.status(500).json({ error: "true", message: err.message });
  }
}
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({
      message: "Users found",
      users: users.map((user) => {
        return {
          name: user.name,

          score: user.score,
        };
      }),
    });
  } catch (err) {
    res.status(500).json({ error: "true", message: err.message });
  }
};

const regUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const isUser = await User.findOne({ email: email });
    if (isUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return res.status(200).json({
      error: "false",
      message: "User registered successfully",
      user: {
        name,
        email,
        token: generateToken(newUser),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "true", message: err });
  }
};
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "Please fill all the fields" });
    }
    const isUser = await User.findOne({ email: email });
    if (!isUser) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({
      message: "Login's successful",
      user: {
        id: isUser._id,
        email,
        name: isUser.name,
        difficulty: isUser.difficulty,
        score: isUser.score,
        token: generateToken(isUser),
      },
    });
  } catch (err) {
    res.status(500).json({ error: "true", message: err });
  }
}
async function getAnswers(req, res) {
  try {
    const { id } = req.user;
    const user = await User.findById({
      _id: id,
    });
    if (user.answers.length === 0) {
      return res.status(404).json({
        message: "No answers found",
      });
    }
    return res.status(200).json({
      message: "Answers found",
      answers: user.answers,
    });
  } catch (err) {
    res.status(500).json({ error: "true", message: err.message });
  }
}
async function addAnswer(req, res) {
  try {
    const { id } = req.user;
    const { isValid, answer } = req.body;
    const newAnswer = { answer, isValid };
    const newUser = await User.findById(
      { _id: id }
     
    );
    if (!newUser) {
      return res.status(400).json({ message: "Answer not added" });
    }
    else{
      newUser.answers.push(newAnswer);
      
      if (isValid) {
        newUser.score += 10;
      }
      await newUser.save(); 
      return res.status(200).json({ message: "Answer added" });
    }
    
    return res.status(200).json({ message: "Answer added" });
  } catch (err) {
    res.status(500).json({ error: "true", message: err.message });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const { password, name } = req.body;

    // Find the user by ID
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "Profile not updated" });
    }

    // Prepare the updated fields
    const updatedFields = {
      name: name || user.name, // Use the provided name or keep the existing one
    };

    // If a new password is provided, hash it and include it in the update
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updatedFields.password = hashedPassword;
    }

    // Update the user in the database
    await User.findByIdAndUpdate({ _id: id }, { $set: updatedFields });

    return res.status(200).json({ message: "Profile updated", updatedFields });
  } catch (error) {
    res.status(500).json({ error: "true", message: error.message });
  }
};

const extractJSON = (text) => {
  const match = text.match(/```json([\s\S]*?)```/);
  return match ? JSON.parse(match[1].trim()) : null;
};
const testApi = async (req, res) => {

  const token = process.env.api_token;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a language teacher, you have to create a quiz for students. Give 1 question in spanish and put it in an array parsable to directly work with it and it's options in an array of objects that each one contains id(number),text and isCorrect boolean.Don't repeat same questions.",
        },
       
      ],
      model: "gpt-4o",
      temperature: 0.5,
      max_tokens: 4096,
      top_p: 1,
    });

    const chatResponse = response.choices[0].message.content;
    const chatJson = extractJSON(chatResponse);
    console.log(chatJson);
    res.status(200).send(chatJson[0]);
  } catch (err) {
    res.status(500).json({ error: "true", message: err.message });
  }
};
const listenApi = async (req, res) => {
 
  const token = process.env.api_token;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });
  try {
    const response = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a language teacher, you have to create some sentences for students. Give a short sentence in english maximum 8 words.",
        },
      ],
      model: "gpt-4o",
      temperature: 0.5,
      max_tokens: 4096,
      top_p: 1,
    });

    const chatResponse = response.choices[0].message.content;
    const chatJson = extractJSON(chatResponse);
    console.log(chatJson);
    res.status(200).send(chatJson[0]);
  } catch (err) {
    res.status(500).json({ error: "true", message: err.message });
  }
}

const verifyOauth = async (req, res) => {
  const { token } = req.body;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub } = ticket.getPayload(); // 'sub' is Google user ID

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        name,
        googleId: sub,
        difficulty: 'easy', // required default field
      });
    }

    //  generate JWT
    const authToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ message: 'User authenticated', token: authToken, user });

  } catch (error) {
    console.error("OAuth error:", error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUser,
  regUser,
  loginUser,
  addAnswer,
  getAnswers,
  updateProfile,
  getAllUsers,
  verifyPasssword,
  testApi,
  verifyOauth,
  listenApi,
};
