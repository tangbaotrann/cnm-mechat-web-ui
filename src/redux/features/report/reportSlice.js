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

            state.data = action.payload;
        });
    },
});

// create form data
const createFormData = (reported) => {
    const { messageId, imageLink, content } = reported;

    console.log('data - 17', reported);

    const dataForm = new FormData();

    // if (messageId.length === 1) {
    //     console.log('message id', messageId[0]._id);
    //     dataForm.append('messageId', messageId[0]._id);
    // } else if (messageId.length > 1) {
    //     messageId.forEach((mess) => {
    //         dataForm.append('messageId', mess);
    //     });
    // }

    dataForm.append('messageId', messageId);
    dataForm.append('fileImage', imageLink[0].data);
    console.log('fileImage - 39', imageLink[0].data);
    dataForm.append('content', content);

    return dataForm;
};

// create report
export const fetchApiCreateReport = createAsyncThunk('reportSlice/fetchApiCreateReport', async (reported) => {
    try {
        console.log('47 - data - fetch -', reported);
        let formData = createFormData(reported);
        console.log('49 - form-data -', formData);
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
