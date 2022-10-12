import { configureStore } from '@reduxjs/toolkit';

// me
import userSlice from './features/user/userSlice';
import conversationSlice from './features/conversation/conversationSlice';
import filterSlice from './features/filter/filterSlice';

import userListSlice from './features/user/usersSlice';
import listFriendAccept from './features/friend/friendAccept';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        conversations: conversationSlice.reducer,
        filters: filterSlice.reducer,
        users: userListSlice.reducer,
        listAccept: listFriendAccept.reducer,
    },
});

export default store;
