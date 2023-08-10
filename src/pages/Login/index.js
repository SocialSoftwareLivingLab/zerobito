import './style.css';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu/index.js';
import LoginCard from '../../components/LoginCard/index.js';

const Login = () => {
  return (
    <div>
          <Menu/>
          <LoginCard/>
          Caso não tenha um login,<Link to="../cadastro"> Clique Aqui</Link>
    </div>
  );
}

export default Login;
