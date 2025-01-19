import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { addOrder } from "../features/ordersSlice";
import { PIZZA_BASES, PIZZA_SIZES, PIZZA_TYPES } from "../utils/constants";


const OrderForm = () => {

  const dispatch = useDispatch();
  const activeOrders = useSelector(state => state.orders.activeOrders);
  const [orderData, setOrderData] = useState({
    type : PIZZA_TYPES[0],
    size : PIZZA_SIZES[0],
    base : PIZZA_BASES[0]
  });

  const handleSubmit = (e) => {

    e.preventDefault();
    if(activeOrders.length >= 10){
      alert('Not taking any order for now');
      return;
    }

    dispatch(addOrder(orderData));
    setOrderData({
      type : PIZZA_TYPES[0],
      size : PIZZA_SIZES[0],
      base : PIZZA_BASES[0]
    })

  }

  return <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Place Order</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label  className="block mb-2">Pizza Type</label>
        <select value={orderData.type}
          onChange={(e)=> setOrderData({...orderData, type : e.target.value})}
          className="w-full p-2 border rounded"
          >
            {
              PIZZA_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))
            }
          </select>
      </div>

      <div>
        <label className="block mb-2">Pizza Size</label>
        <select value={orderData.size}
          onChange={(e)=> setOrderData({...orderData, size : e.target.value})}
          className="w-full p-2 border rounded"
          >
            {
              PIZZA_SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))
            }
          </select>
      </div>

      <div>
        <label className="block mb-2">Pizza Base</label>
        <select value={orderData.base}
          onChange={(e)=> setOrderData({...orderData, base : e.target.value})}
          className="w-full p-2 border rounded"
          >
            {
              PIZZA_BASES.map(base => (
                <option key={base} value={base}>{base}</option>
              ))
            }
          </select>
      </div>

      <button type="submit"
      className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >Place Order</button>
    </form>
  </div>;
};

export default OrderForm;

