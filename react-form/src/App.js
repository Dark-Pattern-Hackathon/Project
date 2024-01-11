import Feedback from "./feedback";
import Form from "./form";
import { Routes, Route } from "react-router-dom";
function App() {
  
  return (
    
      <Routes>
        <Route path="/form" element={<Form />} >
        </Route>
        <Route path="/feedback" element={<Feedback />} >
        </Route>
      </Routes>
  
  );
}

export default App;
