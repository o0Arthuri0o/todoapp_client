import React, { useState } from 'react'
import './Modal.scss'
import { useCookies } from 'react-cookie'

type ModalProps = {
  mode: string,
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
  task?:{
    id: string,
    user_email: string,
    title: string,
    progress: number,
    date: string
  },
  getData: () => void
}

const Modal = ({mode, setShowModal, task, getData}: ModalProps) => {

  // const mode  = 'create'
  const [cookies, setCookie, removeCookie] = useCookies()
  const editMode = ((mode === 'edit') ? true : false)

  const [data, setData] = useState({
    user_email: editMode ? task?.user_email : cookies.Email,
    title: editMode ? task?.title : '',
    progress: editMode ? task?.progress : 50,
    date: editMode ? task?.date : new Date()
  })

  const postData = async(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos`, {
        method: "POST",
        headers:{"Content-Type": 'application/json'},
        body: JSON.stringify(data)
      })
      console.log(res)
      if(res.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch (e) {
      console.error(e)
    }
  }

  const editData = async(e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    e.preventDefault()
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task?.id}`, {
        method:'PUT', 
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify(data)
      })
      if(res.status === 200) {
        setShowModal(false)
        getData()
      }
    } catch(err) {
      console.error(err)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("first")
    const {name, value} = e.target

    setData(data => ({
      ...data,
      [name]: value
    }))

    // console.log(data.title)
  }

  return (
    <div className='overlay' >
      <div className='modal' >
        <div className='form-title-container'>

          <h3>Let's {mode} your task </h3>
          <button onClick={()=> setShowModal(false)} >X</button>
        </div>

        <form>
          <input 
            // type="text" 
            required maxLength={30} 
            placeholder='Your task goes here'
            name='title'
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input 
            id='range'
            type="range"
            required
            min="0"
            max="100"
            name='progress'
            value={data.progress}
            onChange={handleChange}
            style={{padding:'0'}}
            />
          <input onClick={editMode ? editData : postData}  type="submit"  className={mode} />
        </form>

      </div>
    </div>
  )
}

export default Modal