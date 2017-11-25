/**
 * Created by aelittaezugbaa on 25/11/2017.
 */
import React from 'react';
import {Table} from 'react-bootstrap'

export default class Transactions extends React.Component{
  render(){
    return(
      <Table responsive>
        <thead>
        <tr>
          <th>#</th>
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