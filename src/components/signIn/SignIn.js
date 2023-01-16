import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'

function SignIn({users, setUsers, setCurrentUser, currentUser}) {
    const navigate = useNavigate()
    const formInRef = useRef(null)
    const errorRefIn = useRef(null)
    const [check, setCheck] = useState(false)

    

    useEffect(() => {
        
        if (currentUser) {
            navigate('/chat')
          }

    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = formInRef.current[0].value
        const password = formInRef.current[1].value
        if (email && password) {
            for (let i = 0; i < users.length; i++) {
                if (email === users[i].email && password === users[i].password && check) {
                    localStorage.setItem('currentUser', JSON.stringify(users[i]))
                    navigate('/chat')
                }else if (email === users[i].email && password === users[i].password && !check) {
                    setCurrentUser(users[i])
                    navigate('/chat')
                }else {
                    errorRefIn.current.style.display = 'block'
                }
            }
        }else {
            errorRefIn.current.style.display = 'block'
        }

    }

    return (
        <div className='signin'>
        <div className='container'>
            <div className='signinForm'>
                <div className='formContainer'>
                    <div ref={errorRefIn} className='errorIn'>
                        <h2>Invalid Authorization</h2>
                    </div>
                    <div className='formContainerHeader'>
                        <h1>ART-CHAT</h1>
                        <h2>Sign-In</h2>
                    </div>
                    <form ref={formInRef} onSubmit={handleSubmit} className='formin'>
                        <input 
                            type="email"
                            className='emailIn'
                            placeholder='Your Email@' 
                        />
                        <input 
                            type="password"
                            className='passwordIn'
                            placeholder='Your Password' 
                        />
                        <div className='btnIn'>
                                <label><input type="checkbox" onChange={() => setCheck(prev => !prev)} />Remember me</label>
                                <div className='btn'>
                                    <button className='signInBtn'>Sign In</button>
                                    <span onClick={() => navigate('signup')}>Sign Up</span>
                                </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SignIn