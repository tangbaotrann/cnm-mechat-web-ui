import { configureStore } from '@reduxjs/toolkit';

// me
import userSlice from './features/user/userSlice';
import conversationSlice from './features/conversation/conversationSlice';

import userListSlice from './features/user/usersSlice';

import messagesSlice from './features/messages/messagesSlice';
import filterSlice from './features/filter/filterSlice';
import listFriendAccept from './features/friend/friendAcceptSlice';
import listMeRequestFriend from './features/friend/meFriendRequestSlice';
import updateUserSlice from './features/user/updateUserSlice';
import userCurrents from './features/user/userCurrent';
import friendsSlice from './features/friend/friendsSlice';
import listGroupUsers from './features/Group/GroupSlice';

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        conversations: conversationSlice.reducer,
        filters: filterSlice.reducer,
        users: userListSlice.reducer,
        listAccept: listFriendAccept.reducer,
        messages: messagesSlice.reducer,
        listMeRequest: listMeRequestFriend.reducer,
        updateUser: updateUserSlice.reducer,
        userCurrents: userCurrents.reducer,
        friends: friendsSlice.reducer,
        listGroupUser: listGroupUsers.reducer,
    },
});

export default store;
