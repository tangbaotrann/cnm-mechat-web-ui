import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        clickSendMessage: null,
    },
    reducers: {
        addMessages: (state, action) => {
            console.log('SLICE MESSAGE - ', action.payload);
            state.clickSendMessage = action.payload;
        },
    },
});

export default messagesSlice;
