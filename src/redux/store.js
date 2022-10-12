import { configureStore } from '@reduxjs/toolkit';

// me
import userSlice from './features/user/userSlice';
import conversationSlice from './features/conversation/conversationSlice';

import userListSlice from './features/user/usersSlice';

import messagesSlice from './features/messages/messagesSlice';
import filterSlice from './features/filter/filterSlice';
import listFriendAccept from './features/friend/friendAccept';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        conversations: conversationSlice.reducer,
        filters: filterSlice.reducer,
        users: userListSlice.reducer,
        listAccept: listFriendAccept.reducer,
        messages: messagesSlice.reducer,
    },
});

export default store;
