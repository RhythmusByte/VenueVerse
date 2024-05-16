import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter , Routes } from 'react-router-dom'
import Homescreen from './screens/Homescreen';

function App() {
  return (
    <div className="App">

      <Navbar/>
      <BrowserRouter>

        <Routes path="/Home" exact Component={Homescreen}  />

      </BrowserRouter>
    </div>
  );
}

export default App;
