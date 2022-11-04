import { createSelector } from '@reduxjs/toolkit';
export const searchTextSelector = (state) => state.filters.search;
export const userListSelector = (state) => state.users.data;
export const userInfoSelector = (state) => state.user.data;
export const listFriendAccept = (state) => state.listAccept.data;
export const conversationSlice = (state) => state.conversations.conversationClick;
export const listMeRequests = (state) => state.listMeRequest.data;

//Load data
export const usersRemainingSelector = createSelector(
    userListSelector,
    userInfoSelector,
    searchTextSelector,
    (users, user, search) => {
        console.log(search);
        if (search) {
            if (search.startsWith('0')) {
                const usersFilter = users.filter((_user) => _user.phoneNumber === search);
                //don't find
                if (!usersFilter.length) {
                    return 1;
                }

                return usersFilter.map((user) => ({
                    _id: user._id,
                    fullName: user.fullName,
                    avatar: user.avatarLink,
                    phoneNumber: user.phoneNumber,
                    isFriend: false,
                }));
            } else {
                return 1;
            }
        }
        return false;
    },
);
//

//tim ban da gui loi moi ket hay chua
export const accountExists = createSelector(userListSelector, searchTextSelector, (users, search) => {
    if (search) {
        if (search.startsWith('0')) {
            const usersFilter = users.filter((_user) => _user.phoneNumber === search);
            //don't find
            if (!usersFilter.length) {
                return 1;
            }
            return true;
        } else {
            return 1;
        }
    }
    return false;
});
//user login
export const userLogin = createSelector(userInfoSelector, (user) => {
    return user;
});
export const listFriend = createSelector(userInfoSelector, userListSelector, (user, users) => {
    console.log('USER', user);
    console.log('USERs', users);
    if (users) {
        const friends = users.filter((_user) => user.friends.includes(_user._id));
        return friends.map((user) => ({
            _id: user._id,
            name: user.fullName,
            fullName: user.fullName,
            backgroundLink: user.backgroundLink,
            imageLinkOfConver: user.avatarLink,
            avatarLink: user.avatarLink,
            gender: user.gender,
            status: user.status,
            phoneNumber: user.phoneNumber,
            birthday: user.birthday,
        }));
    }
    return null;
});
// yeu cau ket ban
export const searchFilterFriend = createSelector(
    userListSelector,
    userInfoSelector,
    searchTextSelector,
    (users, user, search) => {
        if (search) {
            if (search.startsWith('0')) {
                const usersFilter1 = users.filter(
                    (_user) => _user.phoneNumber === search && !user.friends.includes(_user._id),
                );
                //don't find
                if (!usersFilter1.length) {
                    return false;
                }
                return true;
            } else {
                return 1;
            }
        }
        return false;
    },
);
export const c = createSelector(conversationSlice, (c) => {
    console.log(c);
    return c;
});
export const allSearch = createSelector(
    userListSelector,
    userInfoSelector,
    searchTextSelector,
    (users, user, search) => {
        console.log(search);
        if (search) {
            if (search.startsWith('0')) {
                const usersFilter = users.filter((_user) => _user.phoneNumber === search);
                //don't find
                if (!usersFilter.length) {
                    return 1;
                }
                return usersFilter;
            } else {
                return 1;
            }
        }
        return false;
    },
);
