import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {


  const headers = { "X-Authorization": "pk_4385257974c9e9062c8c71e284f5362186157d0f113fb" }
  let [products, setProducts] = useState([]);
  const [count, setCount] = useState(0)
  let [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("https://api.chec.io/v1/products?limit=25", { headers: headers })
      .then((res) => {
       let ps = res.data.data;
       let productarray = ps.map((product)=>{
          product["qty"] = 0;
          return product;
       });
       setProducts(productarray);
       calculateTotal();
      })
  }, [])

  function decrease(e, product){
    e.preventDefault();
    let productarray = products.map((p)=>{
      if(product.id === p.id && p.qty > 0)
        p.qty -= 1;
      return p;
   });
   calculateTotal();
   setProducts(productarray);
  }

  function calculateTotal(){
    let t  = 0;
    products.map((p)=>{
      t += p.qty * p.price.formatted;
   });
   setTotal(t);
  }

  function increase(e, product){
    e.preventDefault();
    let productarray = products.map((p)=>{
      if(product.id === p.id)
        p.qty += 1;
      return p;
   });
   setProducts(productarray);
   calculateTotal();
  }

  return (
    <div className="container mt-4">

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th colSpan={4} scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {
            products.map((product, i) => {
              return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td><img height={"60px"} src={product.image.url} alt="" /></td>
                    <td>{product.name}</td>
                    <td id={"price_"+i}>{product.price.formatted}</td>
                    <td><button onClick={(e) => decrease(e, product)} type="button" className="btn btn-warning">-</button></td>
                    <td>{product.qty}</td>
                    <td><button onClick={(e) => increase(e, product)} type="button" className="btn btn-warning">+</button></td>
                    <td className='text-end'>{ (product.qty * product.price.formatted).toFixed(2) }</td>
                  </tr>
              )
            })
          }
        <tr>
          <td colSpan={7}></td>
          <td className='text-end'><b>{ total.toFixed(2) }</b></td>
        </tr>

        </tbody>
      </table>
    </div>
  );
}

export default App;
