import { useState } from 'react'
import './ListItem.scss'
import TickIcon from '../TickIcon/TickIcon'
import ProgressBar from '../ProgressBar/ProgressBar'
import Modal from '../Modal/Modal'

type ListItemProps = {
  task:{
    id: string,
    user_email: string,
    title: string,
    progress: number,
    date: string
  },
  getData: () => void
}
const ListItem = ({task, getData}: ListItemProps) => {

  const [showModal, setShowModal] = useState(false)

  const deleteItem = async() => {

    try{

      const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${task.id}`, {
        method: 'DELETE',
      })
      if(res.status === 200) {
        getData()
      }


    } catch(err) {
      console.error(err)
    }


  }

  return (
    <div className='list-item' >
      
      <div className='info-container'>

        <TickIcon/>
        <p className='tack-title' >{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      
      <div className='button-container' >
        <button className='edit' onClick={()=> setShowModal(true)} >EDIT</button>
        <button className='delete' onClick={deleteItem} >DELETE</button>
      </div>
      {showModal && <Modal mode={'edit'}  setShowModal={setShowModal} task={task} getData={getData} /> }
    </div>
  )
}

export default ListItem