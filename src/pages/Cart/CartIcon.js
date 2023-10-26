import React, { useContext, useEffect,useState } from 'react';
import { Row, Col, Button, Table, Modal, Form, FormGroup, FormSelect } from "react-bootstrap";
import Home from '../Home/Home';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../MyContext';

function CartIcon() {


  const { text, setText } = useContext(MyContext);

  useEffect(() => {
    console.log("text is :" + text)
  }, [])

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={() => setText('Hello, world!')}>
        Click me
      </button>

    </div>
  );

  /*  const valueToPass = 'Hello, Username!';
   
   useEffect(() => {
     console.log("text is :" + text)
   }, [])

 return (
   <>
     <div> {valueToPass}</div>
     <h1>{text}</h1>

     <h2 className="mt-4">Order Detils</h2>  

<Table>
   <thead>
       <th> Id</th>
       <th>Item</th>
       <th className="text-end"> Price</th>
   </thead> */

  {/*  <tbody>

        {order && order.map(book => {
            return (
                <tr key={book.id}>
                    <td>{book.id}</td>
                    <td>{book.title}</td>
                    <td className="text-end">{book.price}</td>
                </tr>
            )
        })}

        <tr className="mt-3">
            <th colSpan={2}> Total</th>
            <th className="text-end"> {total}</th>
        </tr>
    </tbody> */}

  /* </Table>
        
      </>
      
    ); */
}

export default CartIcon;