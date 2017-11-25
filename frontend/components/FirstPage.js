/**
 * Created by aelittaezugbaa on 25/11/2017.
 */
import React from 'react';
import Input from './Input'

export default class FirstPage extends React.Component{
  render() {
    return(
      <div className="container">
        <form>
          <Input ref={ref=>this.income=ref} placeholder="Enter your monthly income">Income</Input>
        </form>
      </div>
    )

  }
}