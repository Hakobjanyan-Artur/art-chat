import { addDoc, collection } from "firebase/firestore"
import { db } from "../FirebaseConfig/FirebaseConfig"
import { useRef, useState } from 'react'
import './SignUp.css'
import { useNavigate } from "react-router-dom"


function SignUp() {

    const formRef = useRef(null)
    const errorUpRef = useRef(null)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

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

        const name = formRef.current[0].value
        const lastname = formRef.current[1].value
        const email = formRef.current[2].value
        const password = formRef.current[3].value
        const confirmPassword = formRef.current[4].value

        const usersRef = collection(db, "users")
        
        if(name && lastname && email && password && confirmPassword && password === confirmPassword) {
            addDoc(usersRef, {
                userName: name,
                lastName: lastname,
                email: email,
                password: password,
                avatar: '',
                confirmPassword: confirmPassword,
                date: clockTime(),
                message: []
            })

        }else {
            errorUpRef.current.style.display = 'block'
        }
        formRef.current.reset()
    }

    return (
        <div className='signup'>
            <div className='container'>
                <div className='signupForm'>
                    <div className='formContainer'>
                        <div ref={errorUpRef} className='errorUp'>
                            <h2>Invalid Registration</h2>
                        </div>
                        <div className='formContainerHeader'>
                            <h1>ART-CHAT</h1>
                            <h2>Sign-Up</h2>
                        </div>
                        <form ref={formRef} onSubmit={handleSubmit} className='formup'>
                            <input 
                                type="text"
                                className='nameUp'
                                placeholder='Your Name' 
                            />
                            <input 
                                type="text"
                                className='lastNameUp'
                                placeholder='Your Lastname Name' 
                            />
                            <input 
                                type="email"
                                className='emailUp'
                                placeholder='Your Email@' 
                            />
                            <input 
                                type="password"
                                className='passwordUp'
                                placeholder='Your Password' 
                            />
                            <input 
                                type="password"
                                className='confirmPasswordUp'
                                placeholder='Confirm Your Password' 
                            />
                            <div className='btnUp'>
                                    <button className='signUpBtn'>Sign Up</button>  
                                <span onClick={() => navigate('/')}>Sign In</span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp