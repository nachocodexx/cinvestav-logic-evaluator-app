import React from 'react';
import logo from './logo.svg'
import './App.scss';
import { EventBus } from "ts-bus";
import { BusProvider } from "ts-bus/react";
import { useSpring, animated } from 'react-spring'
import { TruthTables } from './components/TruthTables'
import { LogicForm } from './components/LogicForm/LogicForm'
import { Author } from './components/Author'
// global bus
const bus = new EventBus();



function App() {
  const props = useSpring({ opacity: 1, from: { opacity: 0 } })


  return (
    <BusProvider value={bus}>
      <div className="app" >
        <animated.div className="app_title_wrapper" style={props}>
          <img className="app_image" src={logo} alt="" />
          <h1 className="app_title">Logic Evaluator</h1>
        </animated.div>
        <LogicForm />
        {/* <AppLoader /> */}
        <TruthTables />
        <Author />
      </div>
    </BusProvider>
  );
}

export default App;
