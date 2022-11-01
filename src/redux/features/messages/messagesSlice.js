// lib
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// me
import socket from '~/util/socket';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        data: [],
        isLoading: false,
        clickSendMessage: null,
    },
    reducers: {
        messageCurrent: (state, action) => {
            state.clickSendMessage = action.payload;
        },
        changeFileMessage: (state, action) => {
            // console.log('[FILE MESSAGE STORE] - ', action.payload);
            state.fileSendMessage = action.payload;
        },
        arrivalMessageFromSocket: (state, action) => {
            const newMessage = action.payload;
            const messageId = state.data.find((message) => message._id === newMessage._id);

            // check
            if (!messageId) {
                state.data.push(action.payload);
            } else {
                console.log('Existing message id!!!');
                return;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchApiMessagesByConversationId.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchApiMessagesByConversationId.fulfilled, (state, action) => {
                state.data = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchApiMessagesByConversationId.rejected, (state, action) => {
                console.log('Error!');
            })
            // send message
            .addCase(fetchApiSendMessage.fulfilled, (state, action) => {
                state.data.push(action.payload);

                // socket
                socket.emit('send_message', {
                    message: action.payload,
                });
            })
            .addCase(fetchApiSendMessage.rejected, (state, action) => {
                console.log('Error!');
            })
            // delete message
            .addCase(fetchApiDeleteMessage.fulfilled, (state, action) => {
                const { id } = action.payload;
                const message = state.data.findIndex((mess) => mess._id === id);

                if (message) {
                    state.data.splice(message, 1);
                } else {
                    console.log('Error!');
                }
            })
            .addCase(fetchApiDeleteMessage.rejected, (state, action) => {
                console.log('Error!');
            })
            // re-call message
            .addCase(fetchApiRecallMessage.fulfilled, (state, action) => {
                const message = action.payload;
                const listMessage = state.data.map((mess) => (mess._id === message._id ? message : mess));

                state.data = listMessage;
            })
            .addCase(fetchApiRecallMessage.rejected, (state, action) => {
                console.log('Error!');
            });
    },
});

// fetch all message by conversation id
export const fetchApiMessagesByConversationId = createAsyncThunk(
    'messages/fetchApiMessagesByConversationId',
    async (conversationID) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}messages/${conversationID}`);

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
);

const createFormData = (imageMessage) => {
    const { senderID, conversationID, content, imageLink, fileLink } = imageMessage;

    const dataForm = new FormData();

    dataForm.append('senderID', senderID);
    dataForm.append('conversationID', conversationID);
    dataForm.append('content', content);
    dataForm.append('imageLink', imageLink);
    dataForm.append('fileLink', fileLink);

    return dataForm;
};

// send message
export const fetchApiSendMessage = createAsyncThunk('messages/fetchApiSendMessage', async (imageMessage) => {
    if (imageMessage) {
        let formData = createFormData(imageMessage);

        const resFormData = await axios.post(`${process.env.REACT_APP_BASE_URL}messages`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

        return resFormData.data;
    }
});

// delete message
export const fetchApiDeleteMessage = createAsyncThunk(
    'messages/fetchApiDeleteMessage',
    async ({ messageId, userId }) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}messages/delete-for-you/${messageId}`, {
                data: { userId },
                headers: { Authorization: '***' },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
);

// re-call message
export const fetchApiRecallMessage = createAsyncThunk(
    'messages/fetchApiRecallMessage',
    async ({ messageId, conversationID }) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}messages/recall/${messageId}`, {
                data: { conversationID },
                headers: { Authorization: '***' },
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
);

export default messagesSlice;
