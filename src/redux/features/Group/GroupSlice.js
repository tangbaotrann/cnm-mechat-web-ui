import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import socket from '~/util/socket';

export const fetchApiConversationById = createAsyncThunk('listGroupUser/fetchApiConversationById', async (userId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/${userId}`);

        return res.data.data;
    } catch (err) {
        console.log(err);
    }
});

export const listGroupUser = createAsyncThunk('user/listGroupUser', async (arg, { rejectWithValue }) => {
    try {
        const getToken = JSON.parse(localStorage.getItem('user_login'));

        // check token
        if (getToken !== null) {
            const decodedToken = jwt_decode(getToken._token);
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/${decodedToken._id}`);
            return res.data.data;
        }
    } catch (err) {
        rejectWithValue(err);
    }
});
//tạo group
export const createGroup = createAsyncThunk(
    // Tên action
    'user/createGroup ',
    async (data) => {
        // Gọi lên API backend

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}conversations/create-conversation`, {
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

// add member to group
export const fetchApiAddMemberToGroup = createAsyncThunk('listGroupUser/fetchApiAddMemberToGroup', async (memberId) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_BASE_URL}conversations/add-member-conversation/${memberId}`,
        );
        console.log('44 - res -', res.data);
    } catch (err) {
        console.log(err);
    }
});

//xoa thanh vien
export const deleteMember = createAsyncThunk(
    // Tên action
    'user/deleteMember ',
    async (data) => {
        // Gọi lên API backend
        const { conversationId } = data;
        const { memberId, mainId } = data;

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}conversations/delete-member/${conversationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ memberId, mainId }),
        });

        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    },
);
//them thanh vien
export const addMember = createAsyncThunk(
    // Tên action
    'user/addMember ',
    async (data) => {
        // Gọi lên API backend
        const { conversationId } = data;
        const { newMemberID, memberAddID } = data;

        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}conversations/add-member-conversation/${conversationId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newMemberID, memberAddID }),
            },
        );

        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    },
);
//out nhom
export const outGroup = createAsyncThunk(
    // Tên action
    'user/outGroup ',
    async (data) => {
        // Gọi lên API backend
        const { conversationId } = data;
        const { userId } = data;

        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}conversations/out-conversation/${conversationId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            },
        );

        const jsonData = await response.json();
        console.log('134 ---> ', jsonData);

        return jsonData;
    },
);
//doi ten nhom
export const changeNameGroups = createAsyncThunk(
    // Tên action
    'user/changeNameGroups ',
    async (data) => {
        // Gọi lên API backend
        const { conversationId } = data;
        const { newName, userId } = data;

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}conversations/change-name/${conversationId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newName, userId }),
        });

        const jsonData = await response.json();

        return jsonData;
    },
);
//giai tan nhom
export const deleteConversation = createAsyncThunk(
    // Tên action
    'user/deleteConversation ',
    async (data) => {
        // Gọi lên API backend
        const { conversationId } = data;
        const { mainId } = data;
        console.log(data);
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}conversations/delete-conversation/${conversationId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mainId }),
            },
        );

        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    },
);
const listGroupUsers = createSlice({
    name: 'listGroupUser',
    initialState: { data: [], isLoading: false },
    reducers: {
        arrivalCreateGroupFromSocket: (state, action) => {
            const conversation = action.payload;
            const _con = state.data.find((con) => con.id === conversation.id);

            if (!_con) {
                state.data.push(action.payload);
            } else {
                console.log('Existing conversation id!!!');
                return;
            }
        },
        arrivalDeleteConversationOutGroupFromSocket: (state, action) => {
            const _con = state.data.findIndex((con) => con.id === action.payload);

            state.data.splice(_con, 1);
        },
        arrivalUpdateLastMessageFromSocket: (state, action) => {
            // const mess = action.payload;
            // console.log('182 --', mess);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiConversationById.pending, (state, action) => {
                if (action.payload) {
                    state.isLoading = true;
                }
            })
            .addCase(fetchApiConversationById.fulfilled, (state, action) => {
                if (action.payload) {
                    state.data = action.payload;
                    state.isLoading = false;
                }
            })
            .addCase(createGroup.fulfilled, (state, action) => {
                if (action.payload) {
                    state.data.push(action.payload);
                }

                // socket
                socket.emit('create_group', {
                    conversation: action.payload,
                });
            })
            .addCase(deleteMember.fulfilled, (state, action) => {})
            .addCase(addMember.fulfilled, (state, action) => {
                // state.data = action.payload;
            })
            .addCase(outGroup.fulfilled, (state, action) => {
                // state.data = action.payload;

                // socket
                socket.emit('user_out_group', {
                    info: action.payload,
                });
            })
            .addCase(changeNameGroups.fulfilled, (state, action) => {
                // state.data = action.payload;
            });
    },
});
export default listGroupUsers;
