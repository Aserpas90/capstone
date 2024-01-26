import './App.css';
import NavBar           from './components/navBar';
import {PageRouting}    from './components/context';
import { ShareContext } from './components/context';

function App() {
  return (
    <div className='main'>
    <ShareContext>
      <NavBar/>
      <PageRouting/>
    </ShareContext>
    </div>
  );
}

export default App;
