import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.items = [...state.items, action.payload] as never;
        },
        removeFromCart: (state, action) => {
            const index = state.items.findIndex((cartItem: Product) => cartItem.id === action.payload);

            let newBasket = [...state.items];

            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.payload}) as it is not the cart.`);
            }

            state.items = newBasket;
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectItems = (state: any) => state.cart.items;
export const selectTotal = (state: any) => state.cart.items.reduce((total: number, item: Product) => total + item.price, 0);

export default cartSlice.reducer;
