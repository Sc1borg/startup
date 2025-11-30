const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js')
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    DB.updateUser(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

// GetScores
apiRouter.get('/scores', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    switch (req.query.type) {
      case "guess":
        res.send({ highScore: user.highScore });
        break;
      case "wordle":
        res.send({ highScore: user.wordleHigh });
        break;
      case "quote":
        res.send({ highScore: user.quoteHigh })
        break;
      case "emoji":
        res.send({ highScore: user.emojiHigh })
        break;
      default:
        res.status(400).send({ msg: 'Invalid type parameter' });
    }
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// SubmitScore
apiRouter.post('/score', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    const { type, score } = req.body;
    if (!type || score == null) {
      return res.status(400).send({ msg: 'Missing type or score' });
    }
    let changed = false;
    switch (type) {
      case 'guess':
        if (user.highScore == null || user.highScore > score) {
          DB.updateScore(user, 'highScore', score);
          changed = true;
        }
        res.send({ userName: user.email, changed: changed });
        break;
      case 'wordle':
        if (user.wordleHigh == null || user.wordleHigh > score) {
          DB.updateScore(user, 'wordleHigh', score);
          changed = true;
        }
        res.send({ userName: user.email, changed: changed });
        break;
      case 'quote':
        if (user.quoteHigh == null || user.quoteHigh > score) {
          DB.updateScore(user, 'quoteHigh', score);
          changed = true;
        }
        res.send({ userName: user.email, changed: changed });
        break;
      case 'emoji':
        if (user.emojiHigh == null || user.emojiHigh > score) {
          DB.updateScore(user, 'emojiHigh', score);
          changed = true;
        }
        res.send({ userName: user.email, changed: changed });
        break;
      default:
        res.status(400).send({ msg: 'Invalid type' });
    }
  }
});


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    highScore: null,
    wordleHigh: null,
    quoteHigh: null,
    emojiHigh: null,
  };
  await DB.addUser(user);
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }

  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

peerProxy(httpService);