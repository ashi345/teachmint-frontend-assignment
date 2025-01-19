import MainDisplay from './components/MainDisplay';
import OrderForm from './components/OrderForm';
import OrderStages from './components/OrderStages';
import { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { updateOrderTimes } from './features/ordersSlice';

// Code: App component
function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const timer = setInterval(()=>{
      dispatch(updateOrderTimes());
    }, 1000);

    return ()=>clearInterval(timer);
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 ">
      <h1 className='text-3xl font-bold mb-6'>Pizza Shop</h1>
      <div className='grid grid-cols-1 gap-6'>
        <OrderForm/>
        <OrderStages/>
        <MainDisplay/>
      </div>
    </div>
  )
}

export default App
