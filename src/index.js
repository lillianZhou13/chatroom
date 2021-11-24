import { firebaseConfig } from './db'
import { initializeApp } from 'firebase/app';
import {
    getFirestore,collection,getDocs,onSnapshot,
    addDoc,deleteDoc,doc,
    query,where,orderBy,serverTimestamp

} from'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

  initializeApp(firebaseConfig);
 //init service  
const db = getFirestore();
//collection ref
const colRef = collection(db,'chats');
 
/* classes*/ 
import  Chat  from './chat';
const chat = new Chat("jack","general");



//queries
const q = query(colRef,where("room","==","general"),orderBy('createdAt'));
//get real-time collection data

const ul = document.querySelector(".chat-list");
let listTemplate  = '';
onSnapshot(q,(snapshot)=>{
  snapshot.forEach(doc=>{
    console.log({...doc.data(),id:doc.id});
    listTemplate += `
    <li class="list-group-item">
    <p><span>${chat.username}:</span>${doc.data().message}</p>
    <p>${doc.data().createdAt}<p>
    </li>`

  })
  ul.innerHTML = listTemplate;
})

//adding documents

const newChatForm = document.querySelector(".new-chat");
console.log("newchat form",newChatForm)
newChatForm.addEventListener('submit',e=>{
    e.preventDefault();
    const msg = newChatForm.message.value.trim();
    console.log("message field",msg);
    addDoc(colRef,{message:msg,room:"general",createdAt:serverTimestamp()})
.then((data)=>{
  newChatForm.reset();
}).catch(err=>{
    console.log(err);
})
})
//update chatroom

const chatRooms =  document.querySelector(".chatrooms");
chatRooms.addEventListener("click",(e)=>{
    console.log(e.target);
    
})


//delete documents
const docRef= doc(db,'chats','wO1HCSx9NCxHK6LcdruJ');
deleteDoc(docRef)
.then(()=>{
    console.log('delete');
}).catch(err=>{
    console.log(err);
})
