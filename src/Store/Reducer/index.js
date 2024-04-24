import { createStore, combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; 

import EmployeeReducer from "./EmployeeReducer";

const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  employeeReducer: EmployeeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
