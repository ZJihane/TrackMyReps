import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react"

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext)

  if(!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}

// this means that every time that we want to use our workouts data 
// we're just going to invoke this useWorkoutsContext hook and get that context value back 
// another thing we can do inside this hook is just  check that we're within the scope of context 
// we're using or trying to use 
// remember that a context provdier wraps a component tree (in our case the root App component ,
// could be the home component or another sub tree component 
// and if that's the case it means that you'd only be able to use this context 
// whitin that tree of components , and if being used outside that component tree , then 
// the context will be null , in that case insteas of returnin the context which would be pointless 
// when it's null we can throw an error
//  that it wants to provide that context value to 
// ----
// This might seem like a lot of setup for just a small bit of a
// global state , but in the log run it makes things much easier 
// especially when a lot of different components start to share and update the same state 
// now we should consume the context using this hook inside our components ( inside the home page )
