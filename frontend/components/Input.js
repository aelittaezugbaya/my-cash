/**
 * Created by aelittaezugbaa on 25/11/2017.
 */
import React from 'react';

export default class Input extends React.Component{
  render(){
    let {id,children,placeholder}=this.props;
    return(
      <div className="form-group">
        <label htmlFor={id}>{children}</label>
        <input type="text" className="form-control" id={id} aria-describedby="emailHelp" placeholder={placeholder}/>
      </div>
    );
  }
}