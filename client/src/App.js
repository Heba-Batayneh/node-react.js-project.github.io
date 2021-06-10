/**
 * React
 */
import React, { Component } from 'react';

/**
 * React Router Dom
 */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

/**
 * Application CSS
 */
import './App.css';

/**
 * Header
 */
import Header from './components/Header';

/**
 * Home Page
 */
import Home from './components/Home';

/**
 * Login Page
 */
import Login from './components/Login';

/**
 * Register Page
 */
import Register from './components/Register';

/**
 * Create Post Page
 */
import CreatePost from './components/CreatePost';

/**
 * View Post Page
 */
import ViewPost from './components/ViewPost';

/**
 * Edit Post Page
 */
import EditPost from './components/EditPost';

/**
 * Axios
 */
import axios from 'axios';

/**
 * App Component
 */
class App extends Component {
  constructor(props){
    super(props);
    let token = localStorage.getItem('token');
    axios.defaults.headers.common = {'Authorization': token};
  }
  render() {
    return (
      <Router>
        <div>
          <Header></Header>
          <div className="container">
            <div>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/Register" component={Register} />
                <Route path="/post/create" component={CreatePost} />
                <Route path="/post/view/:id" component={ViewPost} />
                <Route path="/post/edit/:id" component={EditPost} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
