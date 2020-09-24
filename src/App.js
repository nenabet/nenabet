import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './Pages/Landing'
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Landing} exact/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;