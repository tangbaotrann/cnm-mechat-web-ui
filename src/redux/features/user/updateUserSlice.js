import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// lay danh sach da gui yeu cau ket ban
export const userUpdate = createAsyncThunk(
    // Tên action
    'user/userUpdate ',
    async (data) => {
        // Gọi lên API backend
        const { idUser } = data;
        const { fullName, gender, birthday } = data;
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}users/${idUser}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, gender, birthday }),
        });

        // Convert dữ liệu ra json
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    },
);
//updateAvatar
const createFormData = (data) => {
    const { _id, avatarLink } = data;
    //console.log(data);
    const dataForm = new FormData();

    dataForm.append('_id', _id);
    dataForm.append('avatarLink', avatarLink);

    return dataForm;
};
export const updateAvatar = createAsyncThunk(
    // Tên action
    'user/updateAvatar ',
    async (data) => {
        if (data) {
            let formData = createFormData(data);

            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}users/update-avatar/${data._id}`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            });
            console.log('52 - ', res.data);
            return res.data;
        }
    },
);

const updateUserSlice = createSlice({
    name: 'user',
    initialState: { data: [] },
    extraReducers: (builder) => {
        builder
            .addCase(userUpdate.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data = action.payload;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.data = action.payload;
            });
    },
});
export default updateUserSlice;
