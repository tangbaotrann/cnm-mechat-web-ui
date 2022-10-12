import { createSelector } from '@reduxjs/toolkit';
export const searchTextSelector = (state) => state.filters.search;
export const userListSelector = (state) => state.users.data;
export const userInfoSelector = (state) => state.user.data;
export const listFriendAccept = (state) => state.listAccept.data;
//Load data
export const usersRemainingSelector = createSelector(userListSelector, searchTextSelector, (users, search) => {
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
});
//user login
export const userLogin = createSelector(userInfoSelector, (user) => {
    return user;
});
export const listFriend = createSelector(userInfoSelector, userListSelector, (user, users) => {
    console.log(user);
    if (users) {
        const friends = users.filter((_user) => user.friends.includes(_user._id));
        return friends.map((user) => ({
            _id: user._id,
            fullName: user.fullName,
            avatar: user.avatarLink,
        }));
    }
    return null;
});
// yeu cau ket ban
