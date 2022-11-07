import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const groupUserSlice = createSlice({
    name: 'groupUserChat',
    initialState: {
        data: [],
        isLoading: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiGroupUserChat.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiGroupUserChat.fulfilled, (state, action) => {
                // const member = action.payload;

                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchApiGroupUserChat.rejected, (state, action) => {
                console.log('Error!');
            });
    },
});

// find member in group
export const fetchApiGroupUserChat = createAsyncThunk('groupUserChat/fetchApiGroupUserChat', async (memberId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}users/${memberId}`);
        return res.data.data;
    } catch (err) {
        console.log(err);
    }
});

export default groupUserSlice;
