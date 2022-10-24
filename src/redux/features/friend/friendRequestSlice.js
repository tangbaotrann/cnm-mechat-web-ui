import { createAsyncThunk } from '@reduxjs/toolkit';

export const friendRequests = createAsyncThunk(
    // Tên action
    'user/friendRequest',

    // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
    async (data) => {
        // Gọi lên API backend

        const response = await fetch(`${process.env.REACT_APP_BASE_URL}friendRequests/create/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log(data);
        // Convert dữ liệu ra json
        const jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    },
);
