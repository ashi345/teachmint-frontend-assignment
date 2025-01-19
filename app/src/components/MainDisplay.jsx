import {useSelector, useDispatch} from 'react-redux';
import { cancelOrder, updateOrderTimes } from '../features/ordersSlice';
import { formatTime } from '../utils/timeUtils';
import { STAGES } from '../utils/constants';
import { useEffect } from 'react';


const MainDisplay = () => {
    const dispatch = useDispatch();
    const activeOrders = useSelector(state => state.orders.activeOrders);
    const totalDelivered = useSelector(state => state.orders.totalDeliveredOrders);

    useEffect(()=>{
        const timer = setInterval(()=>{
            dispatch(updateOrderTimes());
        }, 1000);
        return ()=>clearInterval(timer);
    }, [dispatch]);

    const handleCancel = (orderId) => {
        dispatch(cancelOrder({orderId}));
    }
  return (

    <div className='p-6'>
        <h1 className='text-2xl mb-6 font-semibold'>Main Section</h1>
        <div className='w-full border border-collapse'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th className='border border-gray-300 p-3 text-left'>Order Id</th>
                        <th className='border border-gray-300 p-3 text-left'>Stage</th>
                        <th className='border border-gray-300 p-3 text-left'>Total time spent(time from order placed)</th>
                        <th className='border border-gray-300 p-3 text-left'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {activeOrders.map(order => (
                        <tr key={order.id}>
                            <td className='border border-gray-300 p-3'>Order Id: {order.id} </td>
                            <td className='border border-gray-300 p-3'> {STAGES[order.stage]}</td>
                            <td className='border border-gray-300 p-3'>{formatTime(order.totalTime)} </td>
                            <td className='border border-gray-300 p-3'>
                                {order.stage !== 'ORDER_READY' && (
                                    <button 
                                        onClick={() => handleCancel(order.id)}
                                        className='bg-red-500 text-white px-4 py-2 rounded-lg'
                                    >
                                        Cancel Order
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>

            <div className='border-2 border-gray-300'>
                <div className='grid grid-cols-2'>
                    <div className='p-3 font-bold'>
                        Total Order Delivered
                    </div>
                    <div className='p-3'>
                        {totalDelivered || '000'}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default MainDisplay;
