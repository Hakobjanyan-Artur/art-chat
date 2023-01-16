import './App.css';
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from './components/FirebaseConfig/FirebaseConfig'
import SignUp from './components/SignUp/SignUp';
import { Routes, Route } from 'react-router-dom'
import SignIn from './components/signIn/SignIn'
import { useEffect, useState } from 'react';
import Chat from './components/Chat/Chat';

function App() {

  const user = JSON.parse(localStorage.getItem('currentUser')) || null
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(user)
  const [mate, setMate] = useState(null)
  const usersRef = collection(db, "users")

  useEffect(() => {
    const unscribe = onSnapshot(usersRef, (snapShot) => {
      let users = []
      snapShot.forEach((doc) => users.push({...doc.data(), id: doc.id}))
      setUsers(users)
  })
  return () => unscribe()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='signup' element={< SignUp />}/>
        <Route index element={< SignIn currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} setUsers={setUsers} />} />
        <Route path='chat' element={< Chat mate={mate} setMate={setMate} currentUser={currentUser} users={users} />}/>
      </Routes>
    </div>
  );
}

export default App;
