import { createSlice } from '@reduxjs/toolkit';

// Initialize base state or data
const initialState = {
    allOrders: [],
    activeOrders: [],
    deliveredOrders: [],
    totalDeliveredOrders: 0
};

// Creating create Slice which makes reducer functions for the features
const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    // reducer function => entire logic to update state/data functions 
    reducers: {
        // create addOrder action for the form data/states
        addOrder: (state, action) => {

            // logic for active order are not exceed 10 ordera at a time
            if (state.activeOrders.length >= 10) {
                return;
            }

            // new order instance
            const newOrder = {
                ...action.payload,
                id: `ORDER-${Date.now()}`,
                stage: 'ORDER_PLACED',
                timeInStage: 0,
                totalTime: 0,
                stageStartTime: Date.now(),
                orderTime: Date.now(),
                stageHistory: {
                    ORDER_PLACED: 0,
                    ORDER_MAKING: 0,
                    ORDER_READY: 0,
                    ORDER_PICKED: 0
                },
                isCompleted: false
            };

            // Adding orders into the all Orders and active orders
            state.allOrders.push(newOrder);
            state.activeOrders.push(newOrder);
        },

        // Managing and updating the states and getting the payload from input.
        updateOrderStage: (state, action) => {
            const { orderId, newStage } = action.payload;
            const now = Date.now();

            // Find order in allOrders
            const orderIndex = state.allOrders.findIndex(order => order.id === orderId);
            if (orderIndex !== -1) {
                const order = state.allOrders[orderIndex];
                const timeSpentInCurrentStage = Math.floor((now - order.stageStartTime) / 1000);

                // Update stage history
                order.stageHistory[order.stage] = timeSpentInCurrentStage;

                // Update stage and reset stage timer
                order.stage = newStage;
                order.stageStartTime = now;
                order.timeInStage = 0;

                // Calculate total time
                order.totalTime = Object.values(order.stageHistory).reduce((sum, time) => sum + time, 0);

                // final stage
                if (newStage === 'ORDER_PICKED') {
                    order.isCompleted = true;
                    order.stageHistory[newStage] = 0;
                    order.finalTotalTime = order.totalTime;
                    state.deliveredOrders.push({ ...order });
                    state.activeOrders = state.activeOrders.filter(o => o.id !== orderId);
                    state.totalDeliveredOrders += 1;
                } else {
                    // Update in activeOrders
                    const activeOrderIndex = state.activeOrders.findIndex(o => o.id === orderId);
                    if (activeOrderIndex !== -1) {
                        state.activeOrders[activeOrderIndex] = { ...order };
                    }
                }

                // Update in allOrders
                state.allOrders[orderIndex] = { ...order };
            }
        },

        // Managing order times for all the stages
        updateOrderTimes: (state) => {
            const now = Date.now();
            
            // Update times in allOrders
            state.allOrders = state.allOrders.map(order => {
                if (order.isCompleted) return order;

                const currentTimeInStage = Math.floor((now - order.stageStartTime) / 1000);
                const updatedStageHistory = {
                    ...order.stageHistory,
                    [order.stage]: currentTimeInStage
                };

                return {
                    ...order,
                    timeInStage: currentTimeInStage,
                    totalTime: Object.values(updatedStageHistory).reduce((sum, time) => sum + time, 0),
                    stageHistory: updatedStageHistory
                };
            });

            // Sync activeOrders with updated allOrders
            state.activeOrders = state.activeOrders.map(activeOrder => {
                const updatedOrder = state.allOrders.find(order => order.id === activeOrder.id);
                return updatedOrder ? { ...updatedOrder } : activeOrder;
            });
        },
        // login for cancel order
        cancelOrder: (state, action) => {
            const { orderId } = action.payload;
            state.activeOrders = state.activeOrders.filter(order => order.id !== orderId);
            state.allOrders = state.allOrders.filter(order => order.id !== orderId);
        }
    }
});

export const { addOrder, updateOrderStage, updateOrderTimes, cancelOrder } = ordersSlice.actions;
export default ordersSlice.reducer;