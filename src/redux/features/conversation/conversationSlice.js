// lib
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const conversationSlice = createSlice({
    name: 'conversations',
    initialState: {
        data: [],
        conversationClick: null,
    },
    reducers: {
        clickConversation: (state, action) => {
            console.log('[click conversation by id] - ', action.payload);
            state.conversationClick = action.payload;
        },
        // arrivalCreateGroupFromSocket: (state, action) => {
        //     if (action.payload) {
        //         state.data = action.payload;
        //     }
        // },
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchApiConversationById.fulfilled, (state, action) => {
    //         state.data.push(action.payload);
    //     });
    // },
});

// export const fetchApiConversationById = createAsyncThunk('conversations/fetchApiConversationById', async (userId) => {
//     try {
//         const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/${userId}`);

//         return res.data.data;
//     } catch (err) {
//         console.log(err);
//     }
// });

export default conversationSlice;
