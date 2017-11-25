/**
 * Created by aelittaezugbaa on 25/11/2017.
 */
import React from 'react';
import {Table} from 'react-bootstrap'

export default class Transactions extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Table  condensed responsive>
        <thead>
        <tr>
          <th>Deptor</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>

        </tbody>
      </Table>
    )
  }
}