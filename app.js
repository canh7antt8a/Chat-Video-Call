const express = require('express');
const bodyParser = require('body-parser');
const randomstring = require('randomstring');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const connection = require('./middlewares/connection');

const user = require('./middlewares/user');
const conns = new user();
app.use(connection('conns', conns));

let clients = {};
let rooms = {};

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route điều hướng
var index = require('./routes/index');
var users = require('./routes/users');
app.use('/', index);
app.use('/users', users);

io.on('connection', (socket) => {
    setInterval(function(){
        socket.emit('rooms', rooms);
    }, 1000);

    socket.on('createRoom', (username) => {
        let roomName = randomstring.generate({
            length: 5,
            charset: 'alphanumeric',
            capitalization: 'lowercase'
          });
        
        socket.join(roomName);
        clients[socket] = roomName;
        rooms[roomName] = {
            total: 1,
            own: username
        };
        socket.emit('room', roomName);
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        clients[socket] = room;
        rooms[room].total++;
    });

    socket.on('handshake', (data, room) => {
        socket.broadcast.in(room).emit('handshake', data);
    });

    socket.on('exit', (room) => {
        socket.broadcast.in(room).emit('exit');
        delete rooms[room];
    });
});

app.post('/check', (req, res) => {

    // Kiểm tra phòng chat
    
    if (req.body.room in rooms) {
        let own = rooms[req.body.room].own;
        let username = req.body.username;
        if(username !== own){
            if (rooms[req.body.room].total < 2) {
                res.json({
                    vacancy: true
                });
            } else {
                res.json({
                    vacancy: false,
                    msg: `Phòng Full rồi bạn ei!!`
                })
            }
        } else {
            res.json({
                vacancy: false,
                msg: `Không thể tự gọi cho mình!!`
            })
        }
    } else {
        res.json({
            vacancy: false,
            msg: `Phòng chat không tồn tại`
        })
    }
});

var port = Number(process.env.PORT || 3000);

server.listen(port, () => {
    console.log(`Server started: http://localhost:3000`);
})