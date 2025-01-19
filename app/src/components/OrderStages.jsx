import {useSelector, useDispatch} from 'react-redux';
import { STAGES } from '../utils/constants';
import { updateOrderStage, updateOrderTimes } from '../features/ordersSlice';
import { formatTime, isStageDelayed } from '../utils/timeUtils';
import { useEffect } from 'react';


const OrderStages = () => {

    const dispatch = useDispatch();
    const orders = useSelector(state => state.orders.allOrders);
    useEffect(()=>{
        const timer = setInterval(()=>{
            dispatch(updateOrderTimes());
        }, 1000);

        return ()=> clearInterval(timer);
    }, [dispatch])

    // handle get orders based on stages
    const getOrdersByStage = (stage) => {
        return orders.filter(order => order.stage === stage);
    }
    // handle moving to next stage
    const handleMoveToNextStage = (orderId, currentStage) => {
        const stages = Object.keys(STAGES);
        const currentIndex = stages.indexOf(currentStage);
        if(currentIndex < stages.length - 1){
            dispatch(updateOrderStage({
                orderId,
                newStage : stages[currentIndex + 1]
            }))
        }

    }

  return (
    <div className='w-full p-4'>
        <h2 className='text-2xl font-bold mb-6'>Pizza Stage Section</h2>
        <div className='grid grid-cols-4 gap-0 border border-gray-300'>
            {
                Object.entries(STAGES).map(([stageKey, stageName])=> (
                    <div key={stageKey} className='border-r border-gray-300 p-4 min-h-[400px]'>
                        <h3 className='text-xl font-semibold mb-6 text-center'>
                            {stageName}
                        </h3>
                        <div className='space-y-4'>
                            {
                                getOrdersByStage(stageKey).map(order => (
                                    <div key={order.id}
                                    className={`border rounded-lg p-4 text-center ${isStageDelayed(order.timeInStage, order.size)
                                    ?
                                    'bg-red-500 text-white' : 'bg-white'}`}
                                    >
                                        <div className='text-lg font-semibold mb-2'>
                                            {order.id}  
                                        </div>
                                        <div className='mb-2'>
                                            Time in stage : {formatTime(order.timeInStage)}
                                        </div>
                        
                                        {
                                            stageKey !== 'ORDER_PICKED' && (
                                                <button
                                                    onClick={() => handleMoveToNextStage(order.id, stageKey)}
                                                    className={`w-full py-1 px-4 rounded ${isStageDelayed(order.timeInStage, order.size)
                                                        ? 'bg-white text-red-500' : 'bg-gray-100 text-gray-800'}
                                                        hover:bg-gray-200 transition-colors`}
                                                >
                                                        Next
                                                </button>
                                            )
                                        }
                                    </div>
                                ))
                            }

                        </div>
                    </div>
                ))
            }
        </div>
    
                
    </div>
    );
};

export default OrderStages;
