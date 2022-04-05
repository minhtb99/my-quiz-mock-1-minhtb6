import './App.css';
import 'antd/dist/antd.css'
import FormLogin from './components/user/FormLogin';
import FormRegister from './components/user/FormRegister';
import { Route, Routes } from 'react-router-dom';
import DoQuiz from './components/user/DoQuiz';
import ManageQuiz from './components/admin/ManageQuiz';
import Guard from './Guard/Guard';
import AddQuestion from './components/admin/AddQuestion';
import DetailQuestion from './components/admin/DetailQuestion';
import InputNumberQuiz from './components/user/InputNumberQuiz';
import { useSelector } from 'react-redux';

function App() {
  const globalState = useSelector(state => state)
  const { numberQuestion } = globalState
  return (
    <div>
      <Routes>
        <Route path='/' element={<FormLogin />} />
        <Route path='/register' element={< FormRegister />} />
        <Route element={<Guard />}>
          <Route path='/do-quiz' element={< DoQuiz numberQuestion={numberQuestion} />} />
          <Route path='/manage-quiz' element={< ManageQuiz />} />
          <Route path='/add-question' element={< AddQuestion />} />
          <Route path='/question-detail/:id' element={< DetailQuestion />} />
          <Route path='/number-question' element={<InputNumberQuiz />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
