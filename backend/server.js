const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

const PORT = 8000;

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.use('/login', require('./routes/login/LoginRouter'));
app.use('/register', require('./routes/login/RegisterRouter'));

app.use('/home', require('./routes/home/HomeRouter'));

app.use('/explore_exoplanets', require('./routes/explore_exoplanets/FilteredSearchRouter'));
app.use('/exoplanet', require('./routes/exoplanet/ExoplanetInfoRouter'));
app.use('/exoshowdown/admin', require('./routes/exoshowdown/ContestAdminRouter'));
app.use('/exoshowdown', require('./routes/exoshowdown/ContestUserRouter'));

app.use('/forum/admin', require('./routes/forum/ForumAdminRouter'));
app.use('/forum', require('./routes/forum/ForumUserRouter'))
app.use('/forum/recently-created', require('./routes/forum/RecentlyCreatedRouter'))
app.use('/forum/recently-viewed', require('./routes/forum/RecentlyViewedRouter'))

app.use('/exoquiz/admin', require('./routes/exoquiz/ExoquizAdminRouter'));
app.use('/exoquiz/quizzing', require('./routes/exoquiz/ParticipateInQuizRouter'))
app.use('/exoquiz', require('./routes/exoquiz/ExoquizUserRouter'))
app.use('/exoquiz/leaderboard', require('./routes/exoquiz/LeaderboardRouter'))

app.use('/profile/art-info', require('./routes/profile/ArtInfoRouter'))
app.use('/profile/exocard-collection', require('./routes/profile/ExocardsCollectionRouter'))
app.use('/profile/quiz-info', require('./routes/profile/QuizInfoRouter'))
app.use('/profile/forum-collection', require('./routes/profile/ForumCollectionRouter'))
app.use('/profile/profile-info', require('./routes/profile/ProfileInfoRouter'))

app.use('/follow', require('./routes/follow/FollowRouter'))
app.use('/user', require('./routes/follow/UserRouter'))
app.use('/people-you-may-know', require('./routes/follow/PeopleYouMayKnowRouter'))

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
