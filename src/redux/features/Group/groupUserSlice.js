import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const groupUserSlice = createSlice({
    name: 'groupUserChat',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiGroupUserChat.fulfilled, (state, action) => {
                state.data = action.payload;
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

        console.log('25 - res -', res.data.data);

        return res.data.data;
    } catch (err) {
        console.log(err);
    }
});

export default groupUserSlice;
