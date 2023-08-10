import './App.css';
import Home from "./pages/Home";
import Menu from './components/Menu/index.tsx';

function App() {
  return (
    <div className='App'>
          <Menu/>
          <Home/>
    </div>
  );
}

export default App;
