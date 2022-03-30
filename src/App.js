import './App.css';
import 'antd/dist/antd.css'
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';
import { Route, Routes } from 'react-router-dom';
import DoQuiz from './components/DoQuiz';
import ManageQuiz from './components/ManageQuiz';
import Guard from './Guard/Guard';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<FormLogin />} />
        <Route element={<Guard />}>
          <Route path='/register' element={< FormRegister />} />
          <Route path='/do-quiz' element={< DoQuiz />} />
          <Route path='/manage-quiz' element={< ManageQuiz />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
