import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {API_URI, POSTFIX} from "../../const.js";

const initialState = {
    category: [],
    error: '',
    activeCategory: 0,
};

export const categoryRequestAsync = createAsyncThunk('category/fetch',
    () => fetch(`${API_URI}${POSTFIX}/category`)
        .then(rec => rec.json())
        .catch(error => ({ error }))
    )

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        changeCategory(state, action) {
            state.activeCategory = action.payload.indexCategory
        }
    },
    extraReducers: builder => {
        builder
            .addCase(categoryRequestAsync.pending, (state) => {
                state.eror = '';
            })
            .addCase(categoryRequestAsync.fulfilled, (state, action) => {
                state.eror = '';
                state.category = action.payload;
            })
            .addCase(categoryRequestAsync.rejected, (state, action) => {
                state.eror = action.payload.error
            })
    }
});
export const { changeCategory } = categorySlice.actions;
export default categorySlice.reducer;