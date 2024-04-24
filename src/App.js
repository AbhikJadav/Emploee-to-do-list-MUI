import { Provider } from "react-redux";
import "./App.css";
import EmployeeTable from "./employeeTable";
import { persistor, store } from "./Store/Reducer";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <EmployeeTable />
      </PersistGate>
    </Provider>
  );
}

export default App;
