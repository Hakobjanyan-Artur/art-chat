import './App.css';
import SignUp from './components/SignUp/SignUp';
import { Routes, Route, useNavigate} from 'react-router-dom'
import SignIn from './components/signIn/SignIn'
import { useEffect, useState } from 'react';
import Chat from './components/Chat/Chat';

function App() {

  const user = JSON.parse(localStorage.getItem('currentUser')) || null
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(user)

  return (
    <div className="App">
      <Routes>
        <Route path='signup' element={< SignUp />}/>
        <Route index element={< SignIn currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} setUsers={setUsers} />} />
        <Route path='chat' element={< Chat currentUser={currentUser} users={users} />}/>
      </Routes>
    </div>
  );
}

export default App;
