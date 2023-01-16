import './Chat.css'
import { BiSearchAlt } from "react-icons/bi";
import { IoIosSend } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import avatar from '../../image/logo.png'
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Chat({currentUser, users}) {
    const [img, setImg] = useState('')
    const rightRef = useRef(null)
    const leftRef = useRef(null)
    const burgerLeft = useRef(null)
    const burgerRight = useRef(null)
    const middleRef = useRef(null)
    const navigate = useNavigate()
    const [mate, setMate] = useState(null)

    useEffect(() => {
        if (!currentUser) {
            navigate('/')       
        }
    }, [])
    
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
                                            <div className='users-img'>
                                                <img src={avatar} alt="" />
                                            </div>
                                            <div className='users-mess-name'>
                                                <h4>{user.userName} {user.lastName}</h4>
                                                <h5>txt</h5>
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
                                 </div>
                                 <div onClick={displayRight} ref={burgerRight} className='burger-right'>
                                    < RxHamburgerMenu />           
                                </div>       
                            </div>
                            <div ref={middleRef} className='chat-content-middle-display'>

                            </div>
                            <div ref={middleRef} className='chat-content-middle-bottom'>
                                 <div className='chat-content-middle-form'>
                                      <form>
                                        <input type="text" placeholder='Type your message here ...' />
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