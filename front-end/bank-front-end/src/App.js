import {Routes, Route} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Pages/Signup/Signup';
import Signin from './components/Pages/Signin/Signin';
import Welcome from './components/Pages/Dashboard/Welcome';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import Transaction from './components/Transaction/Transaction';
import Transfer from './components/Transaction/Transfer';
import Deposit from './components/Transaction/Deposit';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/" element={<Welcome />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard/history" element={<Transaction />} />
      <Route path="/dashboard/transfer" element={<Transfer />} />
      <Route path="/dashboard/deposit" element={<Deposit />} />
    </Routes>
  );
}

export default App;

