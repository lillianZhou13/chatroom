/* props username, room
* Method :
 update username
 update room

*/
class Chat{
    constructor(username, room){
        this.username =  username;
        this.room =  room;
    }
    updateUsename(username){
        this.username = username;
    }
    updateRoom(room){
        this.room = room
    }
}

export default Chat;