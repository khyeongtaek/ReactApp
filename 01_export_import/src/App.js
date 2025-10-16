import A_DefaultExport from "./pages/A_DefaultExport";  //-- default export는 중괄호 {} 없이 import 합니다.
import MyComponent from "./pages/B_DefaultExport";  //------ default export는 import 할 때 이름을 바꿀 수 있습니다.
import { PI } from "./pages/C_NamedExport";  //------------- named export는 중괄호 {} 안에 import 합니다. 내보낸 이름과 동일을 이름으로 import 해야 합니다.
import { add as sum } from "./pages/C_NamedExport";  //----- named export는 as 키워드로 import 할 이름을 바꿀 수 있습니다.

function App() {
  return (
    <div className="App">
      <h1>Hello World</h1>
      <A_DefaultExport />
      <MyComponent />
      <div>PI = {PI}</div>
      <div>10 + 20 = { sum(10, 20) }</div>
    </div>
  );
}

export default App;
