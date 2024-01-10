
import { useEffect, useState } from 'react'
import './App.scss'
import ListHeader from './components/ListHeader/ListHeader'
import ListItem from './components/ListItem/ListItem'
import Auth from './components/Auth/Auth'
import { useCookies } from 'react-cookie'


type Task = {
  id: string,
  user_email: string,
  title: string,
  progress: number,
  date: string
}

function App() {

  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [cookies, setCookie, removeCookie] = useCookies()
  console.log(setCookie, removeCookie)

  const authToken = cookies.AuthToken
  const userEmail = cookies.Email



  const getData = async() => {
    try{
      const res = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await res.json()
      setTasks(json)
    }
    catch(e) {
      console.error(e)
    }
  }

  useEffect(()=>{
    if(authToken) {
      getData()
    }
  }, [])

  const sortedTask = tasks?.sort((a, b) => +new Date(a.date) - +new Date(b.date) )

  return (
    <div className='app'>
      {!authToken && <Auth/>}
      {authToken &&
        <>
          <ListHeader listName={'Goals for the New Year 2024'} getData={getData} />
          <p className='welcome' >Welcome back {userEmail} !</p>
          {sortedTask?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </>
      }     
    </div>
  )
}

export default App
