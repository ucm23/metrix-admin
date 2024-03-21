//import { Switch, Route } from "wouter"
//import './styles/styles.css'
import Company from "./screens/company/Company";
import Dashboards from "./screens/Dashboards"
import Users from "./screens/Users"

import { Route, Routes } from "react-router-dom";
import CompanyDetails from "./screens/company/CompanyDetails";
import CompanyGeneral from "./screens/company/CompanyGeneral";
import Category from "./screens/category/Category";
import CategoryDetails from "./screens/category/CategoryDetails";
import FullModalForm from "./components/ui/custom/FullModalForm";
import CategoryGeneral from "./screens/category/CategoryGeneral";

function App() {
   return (
      /*<Switch>
          <Route path="/" component={Dashboards} />
          <Route path="/users" component={Users} />
      </Switch>*/

      <Routes>
         <Route
            path="/"
            element={<Dashboards />}
         />
         <Route
            path="/contacts"
            element={<Users />}
         />
         <Route
            path="/company"
            element={<Company path={"company"} />}
         />
         <Route
            path="/company/:item_id"
            element={<CompanyGeneral />}
         />
         <Route
            path="/company/:item_id/edit"
            element={<FullModalForm />}
         />
         <Route
            path="/company/:item_id/edit"
            element={<CompanyDetails />}
         />



         <Route
            path="/category"
            element={<Category path={"category"} />}
         />
         <Route
            path="/category/:itemId"
            element={<CategoryGeneral />}
         />



      </Routes>
   )
}

export default App
