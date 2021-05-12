import './App.css';
import {useState} from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//Screens
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

//Components
import Navbar from './components/Navbar';
import Backdrop from './components/Backdrop';
import SideDrawer from './components/SideDrawer';
import NotFound from './components/NotFound';
import Signin from './components/Signin';
import Signup from './components/Signup';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminEditProduct from './components/AdminEditProduct';

//Route
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';

function App() {

  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>

      <Navbar click={() => setSideToggle(true)}/>
      <SideDrawer show={sideToggle} click={() => setSideToggle(false)}/>
      <Backdrop show={sideToggle} click={() => setSideToggle(false)}/>
      <main>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route exact path= "/product/:id" component={ProductScreen}/>
          <Route exact path="/cart" component={CartScreen}/>
          <Route exact path ='/signup' component={Signup} />
          <Route exact path = '/signin' component={Signin} />
          <UserRoute exact path = '/user/dashboard' component= {UserDashboard}/>
          <AdminRoute exact path = '/admin/dashboard' component= {AdminDashboard}/>
          <AdminRoute
						exact
						path='/admin/edit/product/:productId'
						component={AdminEditProduct}
					/>
          <Route component={NotFound} />
        </Switch>
      </main>


    </Router>
  );
}

export default App;
