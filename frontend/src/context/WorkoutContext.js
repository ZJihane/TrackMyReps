import { createContext, useReducer } from "react";

export const WorkoutContext = createContext ()
export const WorkoutsReducer = (state,action) => {
   // this function takes 2 args :
   // the state (the previous state before that we're making the change to it )
   // this is a reliable state value 
   // which is this object : {workouts:null} 
   // the second arg we take is the action (which is the object we passed inside the dispatch function )
   // so inside the workoutReducer we're going to check the action type , 
   // what we actually want to do with the data : create , edit , delete ,..... a workout 
   // so what we're going to do is a switch (action) :
   switch (action.type) {
    // what we do in all of these cases is return a new value that we want the state to be 
        //we return a new object in essence 
        // reminder : all of this is just for local state 
        // we're not interacting with the database here 
        // just to keep the local state in sync with the database
    case 'SET_WORKOUTS':
      return { 
        // an array of all the workouts
        workouts: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        // we're adding this new workout to the array with the pre existing workout objects 
        workouts: [action.payload, ...state.workouts] 
      }
    
    case 'DELETE_WORKOUT' :
      return {
        // filter() is a JavaScript array method that creates a new array containing all elements that pass a certain condition.
       //Here, the condition is defined by the arrow function (w) => w._id !== action.payload._id.
        workouts : state.workouts.filter((w) => w._id !== action.payload._id)
      }
    default:
        // return the state unchanged 
      return state
  }
   
}

// the children property represents whatever components or templates 
// the component WorkoutsContextProvider accepts in the props wraps
// for our case the <App/> component that we just wraped in the index file
export const WorkoutsContextProvider = ({children}) => {
    // we want to return a template 
    const [state,dispatch] = useReducer(WorkoutsReducer , {workouts:null} )
    // inside this hook we'll pass 2 arguments 
    // a Reducer function name that we'll name workoutsReducer
    // and an initial value for the state which going to be an object with the workouts property
    //which going to be null to begin with 
    // question : what does this hook useReducer() do ? :
    // it's similar to using state in that we get a state value and a function dispatch 
    // to uodate that state value , and we also sepcify a value for the state which is this object {workouts:null}
    // The different about it is the reducer function : workoutsReducer
    // and how we update the state using this function and also dispatch function as well 
    // so if we want to update the state object we first of all call the dispatch function 
    // dispatch ({type : 'SET_WORKOUTS' , payload : [{} ,{}] })
    // inside the dispatch function we pass an argument 
    // this argument should have a type property 
    // which normally a string all caps that describes in words the state change that we want to make
    // if we want to create/set a new workout : 'CREATE_WORKOUT' , 'SET_WORKOUT' , 'SET_WORKOUTS'
    // the second property is a payload property that represents any data that we need to make this change 
    // in this case it would be an array of workouts [] object
    // the argument inside the dispatch function is known as an action
    // when we call this dispatch function inside the reducer function 
    // in turn our reducer function is invoke which is this "workoutsReducer" function
    // and it passes the action inside the reducer function , so it can do its thing and update 
    // the state using that information data 
    // let's create the reducer function :


    return (
        //this component given to us by the context we created 
        // it wraps whatever part in the app that needs access to the context
        // it needs to wrap the root app component ( the root of the component tree)
        // which is the <App/>
        // but it's impossible to copy this App tag and paste it it's not going to work 
        // solution : go to index.js
        // -----------------
        // adding a state value to the context : which means it's not providing anything to the rest of the APP
        // add a value prop inside the workoutContext.Provider
        // whatever value we set it equal to will be available to all the other components
        // the object workouts : [] will be available for all the components to consume 
        /* <WorkoutContext.Provider value = ( {workouts : [] } )>
            {children}
        </WorkoutContext.Provider> */
        // but it's not practical to hard code the values that we want to provide to our app directly into value
        // it should be a dynamic state value 
        // we could create a state into this custom component using the useState () hook
        // and pass this state value into WorkoutContext.Provider value 
        // and over time we can update that state value with various functions to add or remove workouts from it 
        // but instead of useState we will use another hook built into react called useReducer()

        //provide the state and the dispatch in value here , so it'savailable for other components
        // the value is an object {state,dispatch}

        // the way we consume this context and these 2 values in our components is pretty easy 
        // we can just use a buil in hook calles useContext , and specify which context we want to use 
        // but we can go with another solution 
        // making a custom hook for each context that we have 
        // make a new folder hooks where to put the custom hooks 
        <WorkoutContext.Provider value = {{ ...state,dispatch}} >
            {children}
        </WorkoutContext.Provider>
    )
}
