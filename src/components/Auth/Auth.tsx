import React, { useState } from 'react'
import './Auth.scss'
import { useCookies } from 'react-cookie'

const Auth = () => {

  const [cookies, setCookie, removeCookie] = useCookies()
  console.log(cookies, removeCookie)

  const [error, setError] = useState(null)
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const viewLogin = (status: boolean) => {
    setError(null)
    setIsLogin(status)
  }

  const handleSubmit = async(e: React.MouseEvent<HTMLInputElement, MouseEvent>, endpoint: string) => {
    e.preventDefault()
    // if(!isLogin) {
    //   setError('Make sure passwords match!')
    //   return
    // }

    const res = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method:'POST',
      headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*"},
      body: JSON.stringify({email, password})
    })

    const data = await res.json()
    console.log(data)
    
    if(data.detail) {
      setError(data.detail)
    } else {
      setCookie('Email', data.email)
      setCookie('AuthToken', data.token)

      window.location.reload()
    }

  }

  return (
    <div className='auth-container' >
      <div className="auth-container-box">
        <form >
          <h2>{isLogin ? 'PLease log in' : 'PLease sign up!'}</h2>
          <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          {!isLogin &&  <input type="password" placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
          <input type="submit" className='create' onClick={(e)=>handleSubmit(e, isLogin ? 'login' : 'signup')} />
          {error && <p>{error}</p>}
        </form>

        <div className="auth-options">
          <button onClick={()=>viewLogin(false)} 
            style={{backgroundColor: isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          >Sign up</button>
          <button onClick={()=>viewLogin(true)} 
            style={{backgroundColor: !isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
          >Login</button>
        </div>
      </div>
    </div>
  )
}

export default Auth