import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import socket from '~/util/socket';

export const fetchApiConversationById = createAsyncThunk('listGroupUser/fetchApiConversationById', async (userId) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}conversations/${userId}`);

        return res.data.data.sort((a, b) => Date.parse(b.time) - Date.parse(a.time));
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

// update avatar
const createFormData = (data) => {
    const { userId, imageLink, conversationId } = data;
    //console.log(data);
    const dataForm = new FormData();

    dataForm.append('userId', userId);
    dataForm.append('imageLink', imageLink);
    dataForm.append('conversationId', conversationId);

    return dataForm;
};

export const fetchApiUpdateAvatarOfGroup = createAsyncThunk(
    'updateInfoGroup/fetchApiUpdateAvatarOfGroup',
    async (data) => {
        try {
            if (data) {
                let formData = createFormData(data);
                const res = await axios.post(
                    `${process.env.REACT_APP_BASE_URL}conversations/change-avatar/${data.conversationId}`,
                    formData,
                    {
                        headers: {
                            'content-type': 'multipart/form-data',
                        },
                    },
                );

                return res.data;
            }
        } catch (err) {
            console.log(err);
        }
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

// chặn tin nhắn của 1 thành viên
export const blockMember = createAsyncThunk(
    // Tên action
    'user/blockMember ',
    async (data) => {
        // Gọi lên API backend
        const { conversationId } = data;
        const { userId } = data;
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}conversations/block-conversation/${conversationId}`,
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

//bor chan tin nhan
export const cancelBlockMember = createAsyncThunk(
    // Tên action
    'user/cancelBlockMember ',
    async (data) => {
        // Gọi lên API backend
        const { conversationId } = data;
        const { userId } = data;
        const response = await fetch(
            `${process.env.REACT_APP_BASE_URL}conversations/remove-block-conversation/${conversationId}`,
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

const listGroupUsers = createSlice({
    name: 'listGroupUser',
    initialState: {
        data: [],
        isLoading: false,
        isLoadingOutGroup: false,
        conversationClick: null,
        arrBlocked: [],
    },
    reducers: {
        clickConversation: (state, action) => {
            console.log('[click conversation by id] - ', action.payload);
            state.conversationClick = action.payload;
        },
        arrivalCreateGroupFromSocket: (state, action) => {
            const conversation = action.payload;
            const _con = state.data.find((con) => con.id === conversation.id);

            if (!_con) {
                state.data.unshift(action.payload);
            } else {
                console.log('Existing conversation id!!!');
                return;
            }
        },
        arrivalMemberJoinGroupFromSocket: (state, action) => {
            const preConversation = action.payload;
            const currConversation = state.data.find((con) => con.id === preConversation.id);

            if (currConversation) {
                state.data.push(currConversation);
            } else {
                console.log('Error add member with socket!');
                return;
            }
        },
        arrivalDeleteConversationOutGroupFromSocket: (state, action) => {
            const _con = state.data.findIndex((con) => con.id === action.payload);

            state.data.splice(_con, 1);
        },
        arrivalUpdateLastMessageFromSocket: (state, action) => {
            // pre-last message
            const preConversationLastMessage = action.payload;
            const updateConversationLastMessage = state.data.find(
                (con) => con.id === preConversationLastMessage.conversationID,
            );

            // update last message
            updateConversationLastMessage.content =
                preConversationLastMessage.contentMessage || preConversationLastMessage.content;
            updateConversationLastMessage.time = preConversationLastMessage.createAt;

            // index conversation
            const conversationIndex = state.data.findIndex(
                (con) => con.id === preConversationLastMessage.conversationID,
            );

            state.data.splice(conversationIndex, 1);
            state.data.unshift(updateConversationLastMessage);
        },
        arrivalBlockMessageUserInGroupFromSocket: (state, action) => {
            const preConversation = action.payload;
            const currConversation = state.data.find((con) => con.id === preConversation.conversationId);

            // update
            currConversation.blockBy = preConversation.blockBy;
            currConversation.conversationId = preConversation.conversationId;

            if (currConversation) {
                state.conversationClick = currConversation;
            } else {
                console.log('Error blocked message user!');
                return;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiConversationById.pending, (state, action) => {
                if (action.payload) {
                    state.isLoading = true;
                    // state.data = action.payload;
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
            .addCase(deleteMember.fulfilled, (state, action) => {
                const preMember = action.payload;
                const currMember = state.data.findIndex((mem) => mem === preMember.idMember);

                if (currMember) {
                    state.data.splice(currMember, 1);
                }

                socket.emit('block_user_in_group', {
                    info: action.payload,
                });
            })
            .addCase(addMember.fulfilled, (state, action) => {
                console.log('[add_user_to_group]', action.payload);

                socket.emit('add_user_to_group', {
                    info: action.payload,
                });
            })
            .addCase(outGroup.pending, (state, payload) => {
                // if (state.isLoadingOutGroup) {
                // state.isLoadingOutGroup = true;
                // }
            })
            .addCase(outGroup.fulfilled, (state, action) => {
                state.isLoadingOutGroup = true;

                // socket
                socket.emit('user_out_group', {
                    info: action.payload,
                });
            })
            .addCase(changeNameGroups.fulfilled, (state, action) => {
                const preNameGroup = action.payload;
                const currNameGroup = state.data.find((con) => con.id === preNameGroup.id);

                if (currNameGroup?.name) {
                    currNameGroup.name = preNameGroup.name;
                }

                if (currNameGroup) {
                    state.conversationClick = currNameGroup;
                }

                socket.emit('change_name_group', {
                    conversation: action.payload,
                });
            })
            .addCase(deleteConversation.fulfilled, (state, action) => {
                // state.data = action.payload;
                state.isLoadingOutGroup = true;

                socket.emit('remove_group', {
                    info: action.payload,
                });
            })
            .addCase(blockMember.fulfilled, (state, action) => {
                // console.log('[block_message_user_in_group]', action.payload);

                socket.emit('block_message_user_in_group', {
                    info: action.payload,
                });
            })
            .addCase(cancelBlockMember.fulfilled, (state, action) => {
                const preConversation = action.payload;
                // console.log('[preConversation]', preConversation);

                const currConversation = state.data.findIndex((con) => con.id === preConversation.conversationId);

                if (currConversation) {
                    state.data.splice(currConversation, 1);
                }

                socket.emit('block_message_user_in_group', {
                    info: action.payload,
                });
            })
            .addCase(fetchApiUpdateAvatarOfGroup.fulfilled, (state, action) => {
                const preAvatarGroup = action.payload;
                const currAvatarGroup = state.data.find((con) => con.id === preAvatarGroup.id);

                if (currAvatarGroup?.imageLinkOfConver) {
                    currAvatarGroup.imageLinkOfConver = preAvatarGroup.imageLink;
                }

                if (currAvatarGroup) {
                    state.conversationClick = currAvatarGroup;
                }

                socket.emit('change_avatar_group', {
                    conversation: action.payload,
                });
            });
    },
});

export default listGroupUsers;
