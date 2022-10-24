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
                console.log('Error');
            })
            .addCase(fetchApiSendMessage.fulfilled, (state, action) => {
                state.data.push(action.payload);

                // socket
                socket.emit('send_message', {
                    message: action.payload,
                });
            })
            .addCase(fetchApiSendMessage.rejected, (state, action) => {
                console.log('Error');
            });
    },
});

// fetch all message by conversation id
export const fetchApiMessagesByConversationId = createAsyncThunk(
    'messages/fetchApiMessagesByConversationId',
    async (conversationID) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BASE_URL}messages/${conversationID}`);
            // console.log('RES - ', res.data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
);

const createFormData = (imageMessage) => {
    const { senderID, conversationID, content, imageLink } = imageMessage;

    const dataForm = new FormData();

    dataForm.append('senderID', senderID);
    dataForm.append('conversationID', conversationID);
    dataForm.append('content', content);
    dataForm.append('imageLink', imageLink);

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

export default messagesSlice;
