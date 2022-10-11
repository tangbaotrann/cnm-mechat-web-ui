import { configureStore } from '@reduxjs/toolkit';

// me
import userSlice from './features/user/userSlice';
import conversationSlice from './features/conversation/conversationSlice';
import messagesSlice from './features/messages/messagesSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        conversations: conversationSlice.reducer,
        messages: messagesSlice.reducer,
    },
});

export default store;
