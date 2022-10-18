// lib
import { createSlice } from '@reduxjs/toolkit';

const conversationSlice = createSlice({
    name: 'conversations',
    initialState: {
        data: [],
        isSuccess: false,
        conversationClick: null,
    },
    reducers: {
        clickConversation: (state, action) => {
            console.log('[click conversation by id] - ', action.payload);
            state.conversationClick = action.payload;
        },
    },
});

export default conversationSlice;
