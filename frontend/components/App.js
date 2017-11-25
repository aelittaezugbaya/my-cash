import React from 'react';
import MainView from './MainView'
import FirstPage from './FirstPage';
import Input from './Input'


export default class App extends React.Component {
  constructor(props){
    super(props);

  }
  submit(){
    window.localStorage.setItem('income',parseInt(this.income.value));
  }

  render (){
    return(
      <div>
       {window.localStorage.getItem('income')==null ?
         <div className="container">
           <form onSubmit={()=>this.submit()}>
             <Input ref={ref=>this.income=ref} placeholder="Enter your monthly income">Income</Input>
           </form>
         </div>:<MainView income={window.localStorage.getItem('income')}/>}
      </div>
    );

  }
}