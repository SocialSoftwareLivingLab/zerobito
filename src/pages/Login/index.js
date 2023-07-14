import './style.css';
import { Link } from 'react-router-dom';
import LoginCard from '../../components/LoginCard/index.js';

const Login = () => {
  return (
    <div>
          <LoginCard/>
          Caso não tenha um login,<Link to="../cadastro"> Clique Aqui</Link>
    </div>
  );
}

export default Login;
