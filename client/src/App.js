
import './App.css';
import Card from "./components/Card"
import NavBar from "./components/NavBar"
function App() {
  return (
    <>
    {/*<div className="App">
      <div className='AddPassword'>
        <input type="text" placeholder='Type your password' className='passwordholder'/>
        <br/>
        <input type="text" placeholder='Type your Website name' className='titleholder'/>
        <br/>
        <button className='processbtn'><BsFillArrowRightCircleFill/>Save</button>
      </div>
  </div>*/}
  <div className='parent'>
  <NavBar/>
    <Card/>
  </div>
  
  </>
  
  );
}

export default App;
