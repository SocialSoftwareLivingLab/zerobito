import './style.css';
import { Link } from 'react-router-dom';
import SignupCard from '../../components/RegisterCard/index.js';

function Login() {
  return (
      <div>
        <SignupCard/>
        Caso ja tenha um login, <Link to="../login">Clique Aqui</Link>
      </div>
  );
}

export default Login;
