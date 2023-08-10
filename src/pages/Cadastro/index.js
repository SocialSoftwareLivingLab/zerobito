import './style.css';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/index.js';
import SignupCard from '../../components/RegisterCard/index.js';

function Login() {
  return (
      <div>
        <Menu/>
        <SignupCard/>
        Caso ja tenha um login, <Link to="../login">Clique Aqui</Link>
      </div>
  );
}

export default Login;
