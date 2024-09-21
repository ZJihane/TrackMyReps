import { useEffect } from "react";
import WorkoutDetails from "../components/Workout_details";
import WorkoutForm from "../components/WorkoutForm";
import {useWorkoutsContext} from "../hooks/useWorkoutsContext" 




// here we're fetching all of the workouts inside this home page 
// and we're updating some local component state to store those workouts 
// but we're not using this anymore -> use the global context state  
// we'll use the useWorkoutsContext hook to consume our wourkouts context
const Home = () => {
  /*
  const [workouts, setWorkouts] = useState(null); */

  const {workouts , dispatch } =  useWorkoutsContext()
  // the workouts is null to beging with 
  // but once we fetch the workouts down here we want to update that 
  // we update it using the dispatch function 

  
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {

        const response = await fetch('http://localhost:4000/api/workouts');

        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        // if the response is ok we can dispatch an action  
        // reminder the dispatch has a type , in this case , the dispatch is 'SET_WORKOUTS'
        // bcz we want to update the entire array of wokouts 
        // And the payload is going to be the full array of workouts we get back from the sever
        
        const json = await response.json();
        // when the reponse is ok , and we have the json data 
        // we fire this dispatch function 
        // that in it's turn fires the workoutReducer and passes in the action 
        dispatch({type : 'SET_WORKOUTS' , payload : json })
        // setWorkouts(json);
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout}/>
        ))}
      </div>
      <WorkoutForm/>
    </div>
  );
};

export default Home;
