import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import './LoginPopup.css'
import { StoreContext } from '../StoreContext'
import axios from 'axios'

export const LoginPopup = ({setShowlogin}) => {
    const [currState,setCurrState]=useState('login')
    const {url,token,setToken}=useContext(StoreContext)
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
       
    })
    const onchangeHandler=(event)=>{
        let {name,value}=event.target
        setData((data)=>({...data,[name]:value}))

    }
    useEffect(()=>{
        setData({
                        name: "",
                        email: "",
                        password: ""

       })
    },[currState, setShowlogin])

    let newurl;
    const  submithandler=async(e)=>{
       e.preventDefault()
        if(currState==='sign up'){

            newurl=url+'/api/user/register'
        }
        else{

              newurl=url+'/api/user/login'
        }
        try{
                const res=await  axios.post(newurl,data)
                console.log(res.data)   
                if(res.data.success){
                    setToken(res.data.token)
                    localStorage.setItem("token",res.data.token)
                    alert('Login Successful!');
                    setShowlogin(false);
                    setData({
                        name: "",
                        email: "",
                        password: "",
        
                        })

                }
                else{
                    alert(res.data.message)
                }
        }
        catch(error){
               console.log("error") 

        }
        
       
    }
  return (
    <div className='login-popup'> 
        <div  className={`login-container ${currState === 'login' ? 'login-mode' : 'signup-mode'}`}>
            <div className="login-title-section">
                <h2 className='login-title'>{currState}</h2>
                <img  className='cross-icon' onClick={()=>setShowlogin(false)} src={assets.cross_icon} />
            </div>
            <form onSubmit={(e)=>submithandler(e)} className="login-input">
                {currState==='sign up' && 
                    <div className="input-block">
                    <label htmlFor='input-name'>Name</label>
                    <input onChange={(e)=>onchangeHandler(e)} value={data.name} id='input-name' name='name' type='text' required placeholder='enter name'/>
                    </div>

                }
            
                <div className="input-block">
                    <label htmlFor='input-email'>Email</label>
                    <input onChange={(e)=>onchangeHandler(e)} value={data.email} name='email' id='input-email' type='email'required placeholder='enter email id'/>
                </div>
                <div className="input-block">
                    <label htmlFor='input-password' >Password</label>
                    <input onChange={(e)=>onchangeHandler(e)} value={data.password}  name='password' id='input-password' type='password' placeholder='enter password' required/>
                </div>
                
                {currState==='sign up' &&
                <div>
                     
                    <div className="terms-policy">
                        <input type='checkbox' required></input>
                        <p>By continuing, you accept the <a href="#">Terms</a> and <a href="#">Privacy</a>.</p>

                    </div>
                    <button className='create-btn' type='submit'>Create Account</button>
                    <p className='login-ptag'>Already have an account? <a className='login-link' onClick={()=>setCurrState('login')} href="#">Log in here</a>.</p>  
                </div>
                
                }
                {currState==='login' &&
                    <>  
                    <button className='create-btn  login-btn' type='submit'>Login</button>
                    <p className='login-ptag'>Don't have an account? <a className='login-link' href="#" onClick={()=>setCurrState('sign up')}>Sign up</a> now to get started!</p>
                    

                    </>
                    
                }
                
            

            </form>

        </div>
        
    </div>
  )
}
