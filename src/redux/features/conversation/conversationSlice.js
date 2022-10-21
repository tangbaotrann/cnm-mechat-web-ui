// lib
// import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// import { useSelector } from 'react-redux';

// export const fetchApiConversation = createAsyncThunk('conversations/fetchApiConversation', async () => {
//     const user = useSelector((state) => state.user.data);
//     console.log('SLICE USER - ', user);
//     try {
//         const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/${user?._id}`);
//         console.log('SLICE - ', res.data);
//         return res.data.data;
//     } catch (err) {
//         console.log(err);
//     }
// });

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
