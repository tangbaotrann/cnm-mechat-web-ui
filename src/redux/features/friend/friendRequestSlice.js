import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// me
import socket from '~/util/socket';

export const friendRequests = createAsyncThunk(
    // Tên action
    'user/friendRequests',

    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data) => {
        // Gọi lên API backend

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}friendRequests/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(data);
        // Convert dữ liệu ra json
        const jsonData = await response.json();
        return jsonData;
    },
);
const listFriendRequests = createSlice({
    name: 'friendRequest',
    initialState: { data: [] },
    reducers: {
        friendRequestArrivalFromSocket: (state, action) => {
            console.log('[friendRequestArrivalFromSocket]', action.payload);
            state.data.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(friendRequests.fulfilled, (state, action) => {
            // state.data = action.payload;

            // socket
            socket.emit('send_friend_request', {
                request: action.payload.data,
            });
        });
    },
});
export default listFriendRequests;
