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
        console.log(jsonData);
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

//xoa
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
        console.log(jsonData);
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
        console.log(jsonData);
        return jsonData;
    },
);
const listGroupUsers = createSlice({
    name: 'listGroupUser',
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder.addCase(listGroupUser.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(createGroup.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(deleteMember.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(addMember.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(outGroup.fulfilled, (state, action) => {
            state.data = action.payload;
        });
        builder.addCase(changeNameGroups.fulfilled, (state, action) => {
            state.data = action.payload;
        });
    },
});
export default listGroupUsers;
