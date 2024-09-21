import { useState } from 'react'
import {useWorkoutsContext} from "../hooks/useWorkoutsContext" 

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext ()
  const [title, setTitle] = useState('') // initial value is empty string 
  const [load, setLoad] = useState('') // when the user gonna fill the fields the field's state is updated 
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields , setEmptyFields] = useState([]) // initialize with empty array , if we get empty fields , this would be populated

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = {title, load, reps}
    
    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.EmptyFields)
      
    }
    if (response.ok) {
      setError(null)
      setEmptyFields([])
      setTitle('')
      setLoad('')
      setReps('')
      console.log('new workout added:', json)
      dispatch({type : 'CREATE_WORKOUT' , payload : json})
    }

  }
// what we want to do is when we add a new document to the database 
// we need to dispatch an action which is going to update the context state as well 
//to add that new workout to the global context state 
// and that way we're keeping our UI In sync with the database 



  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
        className= {emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
        className= {emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps} 
        className= {emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm