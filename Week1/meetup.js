import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword"
})

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to mysql');
});

db.query("DROP DATABASE IF EXISTS meetup", (err, result) => {
    if (err) throw err;
    console.log("Meeting database which exists before is deleted");
})

db.query("CREATE DATABASE IF NOT EXISTS meetup", (err, result) => {
    if (err) throw err;
    console.log("Meeting database created");
});

db.query("USE meetup", (err) => {
    if (err) throw err;
});

const inviteTable = "CREATE TABLE Invitee (invitee_no INT AUTO_INCREMENT, invitee_name VARCHAR(255), invited_by VARCHAR(255), PRIMARY KEY (invitee_no))";
db.query(inviteTable, (err, result) => {
    if (err) throw err;
    console.log("Invite table created", result);
});

const roomTable = "CREATE TABLE Room(room_no INT AUTO_INCREMENT, room_name VARCHAR(255), floor_number INT, PRIMARY KEY(room_no))";
db.query(roomTable, (err, result) => {
    if (err) throw err;
    console.log("Room table created", result);
});

const meetingTable = "CREATE TABLE Meeting(meeting_no INT AUTO_INCREMENT, meeting_title VARCHAR(255), room_no INT, starting_time DATETIME, ending_time DATETIME, PRIMARY KEY(meeting_no), FOREIGN KEY(room_no) REFERENCES Room(room_no))";
db.query(meetingTable, (err, result) => {
    if (err) throw err;
    console.log("Meeting table created", result);
});

const inviteInsert = "INSERT INTO Invitee(invitee_name, invited_by) VALUES ('Yunus','Rob'),('Badar','Fede'),('Danil','Josephine'),('Jalal','Utku'),('Nojdar','Guiseppina')";
db.query(inviteInsert, (err, result) => {
    if (err) throw err;
    console.log("Insertion of invites success!", result);
});

const insertRoom = "INSERT INTO Room(room_name, floor_number) VALUES ('CSS Room', 3),('Javascript Room', 2),('API Room', 1),('NodeJS Room', 4),('Database Room', 5)";
db.query(insertRoom, (err, result) => {
    if (err) throw err;
    console.log('Insertion of rooms success!', result);
});

const insertMeeting = "INSERT INTO Meeting(meeting_title, room_no, starting_time, ending_time) VALUES ('CSS exam', 1, '2023-03-15 10:00:00', '2023-03-15 11:00:00'),('Javascript exam', 2, '2023-03-18 09:00:00', '2023-03-15 10:30:00'),('API exam', 3, '2023-04-15 10:00:00', '2023-04-15 11:00:00'),('NodeJS exam', 4, '2023-03-25 10:00:00', '2023-03-25 11:00:00'),('Database exam', 5, '2023-05-01 11:00:00', '2023-05-01 13:00:00')";
db.query(insertMeeting, (err, result) => {
    if (err) throw err;
    console.log('Insertion of meetings success!', result);
});