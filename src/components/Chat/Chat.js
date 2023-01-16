import './Chat.css'
import { BiSearchAlt } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import avatar from '../../image/logo.png'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {collection, updateDoc, doc, deleteDoc} from 'firebase/firestore'
import { db } from '../FirebaseConfig/FirebaseConfig';
import { v4 as uuidv4 } from 'uuid';

function Chat({currentUser, users, mate, setMate, userMess }) {
    const [img, setImg] = useState('')
    const formRef = useRef(null)
    const [currentId, setCurrentId] = useState('')
    const rightRef = useRef(null)
    const leftRef = useRef(null)
    const burgerLeft = useRef(null)
    const burgerRight = useRef(null)
    const middleRef = useRef(null)
    const btnRef = useRef(null)
    const [newMessage, setNewmessage] = useState('') 
    const navigate = useNavigate()
    const [message, setMessage] = useState([])

    function clockTime(){
        let time = new Date()
        let d = time.getDate().toString()
        let m = time.getUTCMonth() + 1
        m = m.toString()
        let y = time.getFullYear().toString()
        let h = time.getHours().toString()
        let min = time.getMinutes().toString()

        if(h.length < 2){h = '0' + h}        
        if(min.length < 2){min = '0' + min}               
               return d + '.' + m + '.' + y + ' ' + h + ':' + min
        }

    useEffect(() => {

        setCurrentId(currentUser?.id)
        if (!currentUser) {
            navigate('/')       
        }
        if (!mate) {
            formRef.current.style.display = 'none'
            btnRef.current.style.display = 'none'
        }else {
            formRef.current.style.display = 'flex'
            btnRef.current.style.display = 'flex'
        }

    }, [mate])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        let id = uuidv4()

        const addMess = async (currentId) => {
            const userDoc = doc(db, 'users', currentId)
            let idx = users.findIndex((user) => user.id === currentId)
            
            const newMess = {
                messages: [
                        {
                            currentName: currentUser.userName,
                            matename: mate.userName,
                            id: id,
                            mess: newMessage,
                            time: clockTime(),
                        },
                        ...users[idx].messages
                ]
            }
            await updateDoc(userDoc, newMess)
        }
        addMess(currentId)

        const addMessto = async (mateid) => {
            const userDoc = doc(db, 'users', mateid)
            let idx = users.findIndex((user) => user.id === mateid)
            
            const newMess = {
                messages: [
                        {
                            currentName: currentUser.userName,
                            matename: mate.userName,
                            id: id,
                            mess: newMessage,
                            time: clockTime(),
                        },
                        ...users[idx].messages
                ]
            }
            await updateDoc(userDoc, newMess)
        }
        addMessto(mate.id)
        

        setNewmessage('')
    }
    
    const displayRight = () => {
        rightRef.current.classList.toggle('block')
        rightRef.current.classList.toggle('chat-content-right')
        leftRef.current.classList.toggle('none')
        burgerLeft.current.classList.toggle('none')
        burgerLeft.current.classList.toggle('burger-left')
        middleRef.current.classList.toggle('none')
        middleRef.current.classList.toggle('chat-content-middle-display')
        middleRef.current.classList.toggle('chat-content-middle-bottom')
    }
    const displayLeft = () => {
        leftRef.current.classList.toggle('blockLeft')
        leftRef.current.classList.toggle('chat-content-left')
        burgerRight.current.classList.toggle('none')
        burgerRight.current.classList.toggle('burger-right')
        middleRef.current.classList.toggle('none')
        middleRef.current.classList.toggle('chat-content-middle-display')
        middleRef.current.classList.toggle('chat-content-middle-bottom')
    }

    const toggleMess = () => {
            
        let mess = userMess?.messages?.filter((el) => el.currentName === currentUser.userName && el.matename === mate.userName || el.currentName === mate.userName && el.matename === currentUser.userName)

        let message = []

        message.unshift(...mess)

        setMessage(message)

    }

    const uploadimg = () => {
        // console.log('hy');
        // console.log(img)
        
    }

    return (
        <div className='chat'>
            <div className='container'>
                <div className='chatContainer'>
                    <div className='chatContent'>
                        <div ref={leftRef} className='chat-content-left'>
                            <div className='chat-content-left-header'>
                                <h1>ART-CHAT</h1>
                            </div>
                            <div className='chat-content-left-middle'>
                                <span>
                                    <BiSearchAlt />
                                </span>
                                <input type="text" placeholder='Search User ...' />
                            </div>
                            <div className='chat-content-left-bottom'>
                                <h2>Users</h2>
                                <div className='chat-content-left-bottom-users'>
                                    {users.map((user) => (
                                        <div key={user.id} onClick={() => setMate(user)} className='users-container'>
                                            <div className='users-container-usersInfo'>
                                                <div className='users-img'>
                                                    <img src={avatar} alt="" />
                                                </div>
                                                <div className='users-mess-name'>
                                                    <h4>{user.userName} {user.lastName}</h4>
                                                    <h5>txt</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='chat-content-middle'>
                            <div className='chat-content-middle-header'>
                                 <div onClick={displayLeft} ref={burgerLeft} className='burger-left'>
                                    < RxHamburgerMenu />           
                                 </div> 
                                 <div className='mate-name'>
                                      <h2>{mate?.userName} {mate?.lastName}</h2>
                                      <div ref={btnRef} className='btns'>
                                            <button>profile</button>
                                            <button onClick={toggleMess}>message</button>
                                      </div>  
                                 </div>
                                 <div onClick={displayRight} ref={burgerRight} className='burger-right'>
                                    < RxHamburgerMenu />           
                                </div>       
                            </div>
                            <div ref={middleRef} className='chat-content-middle-display'>
                                {
                                    message.map((mess) => (
                                        <div key={mess.id} 
                                        style={{
                                            marginLeft: mess.currentName === currentUser.userName ? '5%' : '25%'
                                        }}
                                        className='messContainer'>
                                            <div className='messName'>{mess.currentName} <span>{mess.time}</span></div>
                                            <div className='messMess'>{mess.mess}</div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div ref={middleRef} className='chat-content-middle-bottom'>
                                 <div className='chat-content-middle-form'>
                                      <form ref={formRef} onSubmit={handleSubmit}>
                                        <input onChange={(e) => setNewmessage(e.target.value)} value={newMessage} type="text" placeholder='Type your message here ...' />
                                        <button> <IoIosSend /></button>
                                      </form>  
                                 </div>       
                            </div>
                        </div>
                        <div ref={rightRef} className='chat-content-right'>
                            <div className='chat-content-right-header'>
                                <div className='user-img'>
                                    <img src={avatar} alt="" />
                                </div>
                                <div className='input-file'>
                                    <input onChange={(e) => setImg(e.target.files[0])} type="file" />
                                    <button onClick={uploadimg} >change avatar</button>
                                </div>
                                <div className='currentUser-name'>
                                    <h3>{currentUser?.userName} {currentUser?.lastName}</h3>
                                </div>
                            </div>
                            <div className='chat-content-right-bottom'>
                                <div className='currentUser-info'>
                                    <p>email: {currentUser?.email}</p>
                                    <p>registration date: {currentUser?.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat