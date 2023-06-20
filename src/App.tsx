import './App.css';
import { Routes, Route } from "react-router-dom";
import PatientList from './components/PatientList/PatientList';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import PatientForm from './components/Patient/PatientForm';

function App() {
  return (
   
      <div className="App">
        
        <ErrorBoundary fallback={<p>Something went wrong</p>}>

        <Routes>
          
            <Route index element={<PatientList />} />
            <Route path="patient/:id" element={<PatientForm />} />

            <Route path="*" element={<>Page not found</>} />

        </Routes>

        </ErrorBoundary>

      </div>


  );
}

export default App;
