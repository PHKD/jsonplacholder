import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Posts from './posts/Posts';
import Users from './users/Users';
import Comments from './posts/Comments';
import {Route,BrowserRouter} from 'react-router-dom';
import Albums from './albums/Albums';
import Photos from './albums/Photos';
import Todos from './users/Todos';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
    <BrowserRouter>
        <Route exact path="/" component={App}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/posts" component={Posts}/>
        <Route exact path="/comments" component={Comments}/>
        <Route exact path="/albums" component={Albums}/>
        <Route exact path="/photos" component={Photos}/>
        <Route exact path="/todos" component={Todos}/>
    </BrowserRouter>,
    document.getElementById('root')
);



