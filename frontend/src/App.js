
import './App.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import ForgetPswd from './components/ForgetPswd';
import ResetPaswd from './components/ResetPaswd';
import EmailValidation from './components/EmailValidation';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/email/verification" element={<EmailValidation/>}/>
        <Route path="/pwd" element={<ForgetPswd/>}/>
        <Route path="/resetpwd" element={<ResetPaswd/>}/>
      </Routes>
      </BrowserRouter>
    
  
    </div>
  );
}

export default App;
