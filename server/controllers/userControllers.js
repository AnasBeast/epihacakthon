const User = require("../database/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const OpenAI = require("openai"); // CommonJS require instead of import
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
    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "Profile not updated" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    newUser = {
      name: name || user.name,
      password: hashedPassword || user.password,
    };
    await User.findByIdAndUpdate({ _id: id }, { $set: newUser });
    return res.status(200).json({ message: "Profile updated", newUser });
  } catch (error) {
    res.status(500).json({ error: "true", message: error.message });
  }
};
const extractJSON = (text) => {
  const match = text.match(/```json([\s\S]*?)```/);
  return match ? JSON.parse(match[1].trim()) : null;
};
const testApi = async (req, res) => {
  const { prompt } = req.body;
  const openai = new OpenAI({
    apiKey:process.env.api_key,
  });

  const token = process.env.api_token;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });
  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content:
            "give me quiz to learn spanish ,give 2 question and put them in an array parsable to directly work with it,I want the options in an array of objects that each one contains id,text and isCorrect boolean.Don't repeat same questions",
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
  const { prompt } = req.body;
  const openai = new OpenAI({
    apiKey:process.env.api_key,
  });

  const token = process.env.api_token;

  const client = new OpenAI({
    baseURL: "https://models.inference.ai.azure.com",
    apiKey: token,
  });
  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "" },
        {
          role: "user",
          content:
            "give a short sentence in english maximum 8 words ",
        },
      ],
      model: "gpt-4o",
      temperature: 1,
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
  listenApi,
};
