import A_DefaultExport from "./pages/A_DefaultExport";
import MyComponent from "./pages/B_DefaultExport";
import {PI} from "./pages/C_NamedExport";
import {add as sum} from "./pages/C_NamedExport";


function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <A_DefaultExport/>
      <MyComponent/>
      <div>PI = {PI}</div>
      <div>10 + 20 = {sum(10,20)}</div>    
    </div>
  );
}

export default App;
