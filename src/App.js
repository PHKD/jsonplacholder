import React, {Component} from 'react';
import style from './style.scss'
class App extends Component{

render(){
    return(
    <div className="container">
      <div className="body">
        <div className="wrapper">
        <nav>
        <div className="logo">Json App</div>
          <ul className="menu">
          <li><a href='/posts'>Posts</a></li>
          <li><a href='/comments'>Comments</a></li>
          <li><a href='/albums'>Albums</a></li>
          <li><a href='/todos'>Todos</a></li>
          <li><a href='/photos'>Photos</a></li>
          <li><a href='/users'>Users</a></li>
        </ul>
      </nav>
    </div>
    <div className="content">
      <div className="title">
     <h3>JSONPlaceholder</h3>
     <p>Fake Online REST API for Testing and Prototyping 
Serving ~350M requests per month 
Powered by JSON Server + LowDB</p>
  </div>
   </div>
   <footer>
   <div >
     <p>Copyrigth 2019. All Right Reserved.</p>
   </div>
  </footer>
  </div>
  </div>
    );  
}

}

export default App;
