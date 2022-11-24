import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

// me
import socket from '~/util/socket';

// store
const listFriendRequests = createSlice({
    name: 'friendRequest',
    initialState: { data: [], dataSended: [], dataAccepted: [] },
    reducers: {
        arrivalFriendRequestFromSocket: (state, action) => {
            const preReq = action.payload;
            const currReq = state.dataSended.some((req) => req.idFriendRequest === preReq.idFriendRequest);

            if (!currReq) {
                state.dataSended.push(action.payload);
            }
        },
        arrivalAcceptFriendRequestFromSocket: (state, action) => {
            const preReq = action.payload;
            const currReq = state.data.some((req) => req.idFriendRequest === preReq.idFriendRequest);
            if (!currReq) {
                state.data.push(action.payload);
            }
        },
        arrivalRecallRequestAddFriendFromSocket: (state, action) => {
            const preReq = action.payload;
            const currReq = state.data.findIndex((req) => req.idFriendRequest === preReq);
            state.data.splice(currReq, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            // send request add friend
            .addCase(friendRequests.fulfilled, (state, action) => {
                state.dataSended.push(action.payload.data);

                // socket
                socket.emit('send_friend_request', {
                    request: action.payload.dataSended,
                });
                // socket
                socket.emit('me_friend_request', {
                    request: action.payload.data,
                });
            })
            // accept request friend
            .addCase(fetchApiAcceptRequestFriend.fulfilled, (state, action) => {
                const { listFriendsReceiver, listFriendsSender, friendRequestID, sender, receiver, conversation } =
                    action.payload;
                const del = state.data.findIndex((friend) => friend.idFriendRequest === friendRequestID);
                state.data.splice(del, 1);

                // socket accept friend
                socket.emit('accept_friend_request', {
                    listFriendsReceiver,
                    listFriendsSender,
                    sender,
                    receiver,
                    conversation,
                });
            })
            // exit request friend
            .addCase(fetchApiExitRequestFriend.fulfilled, (state, action) => {
                const { listFriendsReceiver, listFriendsSender, friendRequestID, sender, receiver, conversation } =
                    action.payload;
                const del = state.data.findIndex((friend) => friend.idFriendRequest === friendRequestID);
                state.data.splice(del, 1);

                // socket accept friend
                socket.emit('accept_friend_request', {
                    listFriendsReceiver,
                    listFriendsSender,
                    sender,
                    receiver,
                    conversation,
                });
            })
            // accept friend request
            .addCase(friendAccept.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log('action.payload----', action.payload);
                    state.data = action.payload;
                }
            })
            // get request add friend
            .addCase(meRequestFriend.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log('[91]action.payload----', action.payload);
                    state.dataSended = action.payload;
                }
            })
            .addCase(fetchApiRecallRequestAddFriend.fulfilled, (state, action) => {
                // state.data = action.payload;
                console.log('action.payload - ', action.payload.deleted);

                // // socket
                socket.emit('recall_friend_request', {
                    deleted: action.payload.deleted,
                });
            })
            .addCase(fetchApiDeleteFriend.fulfilled, (state, action) => {
                //console.log('111 - ', action.payload);
                // const preReq = action.payload;

                // state.data = preReq.listFriendsUser;
                // console.log('114 - ', preReq.listFriendsUser);

                // console.log('[delete_friend]', action.payload);

                // socket
                socket.emit('delete_friend', {
                    request: action.payload,
                });
            });
    },
});

// handle send request add friend
export const friendRequests = createAsyncThunk(
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

        // Convert dữ liệu ra json
        const jsonData = await response.json();

        return jsonData;
    },
);

// handle accept friends request
export const fetchApiAcceptRequestFriend = createAsyncThunk(
    // Tên action
    'user/accept ',
    async (data) => {
        // Gọi lên API backend
        const { idRequest } = data;
        const { status, senderID, receiverID } = data;
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}friendRequests/friend-request/${idRequest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID, receiverID }),
        });

        // Convert dữ liệu ra json
        const jsonData = await response.json();
        console.log('id con -', jsonData);
        return jsonData;
    },
);

// handle accept friends request
export const fetchApiExitRequestFriend = createAsyncThunk(
    // Tên action
    'user/fetchApiExitRequestFriend',
    async (data) => {
        // Gọi lên API backend
        const { idRequest } = data;
        const { status, senderID, receiverID } = data;
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}friendRequests/friend-request/${idRequest}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID, receiverID }),
        });

        // Convert dữ liệu ra json
        const jsonData = await response.json();
        return jsonData;
    },
);
// handle get list request add friend
export const friendAccept = createAsyncThunk('user/friendAccept', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));

        // check token
        if (getToken !== null) {
            const decodedToken = jwt_decode(getToken._token);
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}friendRequests/get-list-request/${decodedToken._id}`,
            );
            console.log('[19] -> ', res.data.data);
            return res.data.data;
        }
    } catch (err) {
        rejectWithValue(err);
    }
});
// handle re-call request add friend
export const fetchApiRecallRequestAddFriend = createAsyncThunk(
    // Tên action
    'user/fetchApiRecallRequestAddFriend ',
    async (data) => {
        console.log('DATA - ', data);
        // Gọi lên API backend
        const { status, senderID, idRequest } = data;
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}friendRequests/${idRequest}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status, senderID }),
        });

        // Convert dữ liệu ra json
        const jsonData = await response.json();

        return jsonData;
    },
);
// handle get request add friend
export const meRequestFriend = createAsyncThunk('user/meRequestFriend', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));

        // check token
        if (getToken !== null) {
            const decodedToken = jwt_decode(getToken._token);
            // console.log(decodedToken);
            const res = await axios.get(
                `${process.env.REACT_APP_BASE_URL}friendRequests/get-of-me/${decodedToken._id}`,
            );
            console.log('[65]', res.data);
            return res.data;
        }
    } catch (err) {
        rejectWithValue(err);
    }
});

// handle delete friend
export const fetchApiDeleteFriend = createAsyncThunk('user/fetchApiDeleteFriend ', async (data) => {
    // Gọi lên API backend
    const { idUser } = data;
    const { status, userDeleteId } = data;
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/delete-friend/${idUser}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, userDeleteId }),
    });
    // .then((res) => res.json())
    // .then((resData) => {
    //     if (resData.status === 'success') {
    //         console.log('RES - ', resData);
    //         return resData;
    //     } else {
    //         return Promise.reject(new Error('404 else'));
    //     }
    // })
    // .catch((err) => {
    //     return Promise.reject(new Error('404 else'));
    // });

    // // Convert dữ liệu ra json
    const jsonData = await response.json();
    console.log('[API]', jsonData);
    return jsonData;
});

export default listFriendRequests;
