import React, { useContext, useEffect} from 'react';
import noteContext from '../context/notes/noteContext';

const About = () => {
  const {state,update} = useContext(noteContext);
  useEffect(()=>{
    update();
  },[])

  return (
    <div>
        This is About{state.name} and he is in {state.class};
    </div>
  )
}

export default About
