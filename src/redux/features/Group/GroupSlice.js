import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
export const listGroupUser = createAsyncThunk('user/listGroupUser', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));

        // check token
        if (getToken !== null) {
            const decodedToken = jwt_decode(getToken._token);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/conversations/${decodedToken._id}`);

            return res.data.data;
        }
    } catch (err) {
        rejectWithValue(err);
    }
});
const listGroupUsers = createSlice({
    name: 'listGroupUser',
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(listGroupUser.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});
export default listGroupUsers;
