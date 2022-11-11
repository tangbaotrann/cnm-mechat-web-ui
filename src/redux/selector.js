import { createSelector } from '@reduxjs/toolkit';
export const searchTextSelector = (state) => state.filters.search;
export const userListSelector = (state) => state.users.data;
export const userInfoSelector = (state) => state.user.data;
export const listFriendAccept = (state) => state.listAccept.data;
export const conversationSlice = (state) => state.listGroupUser.conversationClick; // state.conversations.conversationClick
export const listMeRequests = (state) => state.listMeRequest.data;
export const listGroupUser = (state) => state.listGroupUser.data;

export const listMessage = (state) => state.messages.data;

// export const member = (state) => state.groupUserSlices.data;
// console.log('11 - mem -', member);
// // member
// export const getMember = createSelector(member, (members) => {
//     if(member) {
//         const friend =
//     }
// })

export const listFriend = createSelector(userInfoSelector, userListSelector, (user, users) => {
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
//Load data
export const usersRemainingSelector = createSelector(
    userListSelector,
    userInfoSelector,
    searchTextSelector,
    listFriend,
    (users, user, search, friends) => {
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

                ///tim theo ten nguoi da kp

                //Cái này check bắt đầu từ A-Z (sau sửa lại cho giống người Việt)
            } else if (search.match('^[A-Z]')) {
                const friendFilter = friends.filter((friend) => friend.fullName.includes(search));
                //don't find
                if (!friendFilter.length) {
                    return 1;
                }
                console.log(friendFilter);
                return friendFilter.map((user) => ({
                    _id: user._id,
                    fullName: user.fullName,
                    avatar: user.avatarLink,
                    backgroundLink: user.backgroundLink,
                    phoneNumber: user.phoneNumber,
                    gender: user.gender,
                    isFriend: true,
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
//lọc user theo member
export const filterUserGroup = createSelector(conversationSlice, userListSelector, (c, users) => {
    const usersFilter1 = users.filter((_user) => c.members.includes(_user._id));

    if (!usersFilter1.length) {
        return 1;
    }

    return usersFilter1.map((user) => ({
        _id: user._id,
        name: user.fullName,
        imageLinkOfConver: user.avatarLink,
        phoneNumber: user.phoneNumber,
        isFriend: false,
    }));
});
///tim ban trong membergrood
export const filterFriendGroup = createSelector(conversationSlice, listFriend, (c, lf) => {
    const listFriendFilter = lf.filter((_lf) => c?.members.includes(_lf._id));

    if (!listFriendFilter.length) {
        return [];
    }
    return listFriendFilter.map((user) => ({
        _id: user._id,
        name: user.fullName,
        imageLinkOfConver: user.avatarLink,
        phoneNumber: user.phoneNumber,
        isFriend: true,
    }));
});
//tim nhom truong
export const filterLeader = createSelector(conversationSlice, userListSelector, (c, users) => {
    const usersFilter1 = users.filter((_user) => _user._id.includes(c?.createdBy));

    if (!usersFilter1.length) {
        return 1;
    }

    return usersFilter1.map((user) => ({
        _id: user._id,
        name: user.fullName,
        imageLinkOfConver: user.avatarLink,
        phoneNumber: user.phoneNumber,
        isFriend: false,
    }));
});

export const allSearch = createSelector(
    userListSelector,
    userInfoSelector,
    searchTextSelector,
    (users, user, search) => {
        //console.log(search);
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

export const getMessageFromUserInGroupFromSelector = createSelector(
    userInfoSelector,
    userListSelector,
    listMessage,
    (userInfo, userList, listMessage) => {
        try {
            const _message = listMessage.map((message) => {
                const user = userList.find((us) => us._id === message.senderID);
                return message.deleteBy.includes(userInfo._id)
                    ? null
                    : {
                          _id: message._id,
                          action: message.action,
                          content: message.content,
                          imageLink: message.imageLink,
                          fileLink: message.fileLink,
                          createdAt: message.createdAt,
                          deleteBy: message.deleteBy,
                          senderID: message.senderID,
                          user: {
                              id: user?._id,
                              name: user?.fullName,
                              avatarLink: user?.avatarLink,
                          },
                      };
            });

            return _message;
        } catch (err) {
            console.log('[getMessageFromUserInGroup]', err);
        }
    },
);
