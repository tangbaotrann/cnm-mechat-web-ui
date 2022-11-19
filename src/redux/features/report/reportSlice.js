// lib
import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// report store
const reportSlice = createSlice({
    name: 'reportSlice',
    initialState: {
        data: [],
    },
    extraReducers: (builder) => {
        builder.addCase(fetchApiCreateReport.fulfilled, (state, action) => {
            console.log('action.payload', action.payload);

            state.data.push(action.payload);
        });
    },
});

// create form data
const createFormData = (data) => {
    const { messageId, fileImage, content } = data;

    console.log('data - 17', data);

    const dataForm = new FormData();

    if (messageId.length === 1) {
        console.log('message id', messageId[0]._id);
        dataForm.append('messageId', messageId[0]._id);
    } else if (messageId.length > 1) {
        messageId.forEach((mess) => {
            dataForm.append('messageId', mess);
        });
    }

    dataForm.append('fileImage', fileImage[0].preview);
    dataForm.append('content', content);

    return dataForm;
};

// create report
export const fetchApiCreateReport = createAsyncThunk('reportSlice/fetchApiCreateReport', async (data) => {
    try {
        let formData = createFormData(data);
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}reports`, formData, {
            headers: {
                'content-type': 'multipart/form-data',
            },
        });

        console.log('[28 - res]', res.data);

        return res.data;
    } catch (err) {
        console.log(err);
    }
});

export default reportSlice;
