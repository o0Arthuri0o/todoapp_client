import { useState } from 'react'
import './ListHeader.scss'
import Modal from '../Modal/Modal'
import { useCookies } from 'react-cookie'

type ListHeaderProps = {
  listName: string
  getData: () => void
}

const ListHeader = ({listName, getData}: ListHeaderProps) => {

  const [showModal, setShowModal] = useState(false)
  const [ , , removeCookie] = useCookies()

  const signOut = () =>{
    removeCookie('Email')
    removeCookie('AuthToken')
  }

  return (
    <div  className='list-header'>
    
      <h1>{listName}</h1>
      
      <div className="button-container">
        <button className='create' onClick={() => setShowModal(true)} >ADD NEW</button>
        <button className='signout' onClick={signOut} >SIGN OUT</button>
      </div>
      {/* task={{ id: '', user_email: '', title: '', progress: 1, date: ''}} */}
      {showModal &&  <Modal  mode={'create'} setShowModal={setShowModal} getData={getData} />}
    </div>
  )
}

export default ListHeader