import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    newsList: [],
    loading : true, // API den veri çekilirken, iş bittiğinde false olacak. 
};


// API'den thunk middleware ile async veri çekme;
//? State'lerin API gibi async kaynaklardan gelen verilere gore guncellenmesi gerekebilir.
//? Ancak boyle bir durumda async islem tamamlandiktan sonra state guncellenmelidir.
//? Gonderilen api istegi ile dogrudan state guncellenmemelidir.
//? Islemin tamamlanmasi ile gelen veriye gore state'in guncellenemsini saglamak için bir arabirim kullanilmaktadir.
//? Bu arabirim middleware denilir.Redux-Toolkit, default olarak Thunk kullanmaktadir.
//! Thunk'ın amaci reducers'a islenmis sonuclari gondermeden once gecikmeli asenkron ismlerinin yurutulmesini saglamaktir.

// API'den thunk middleware ile async veri çekme;
const API_KEY = '535614d33ce549c1a22ff4d924b213e7';
export const getNews = createAsyncThunk(
    'news/getNews', 
    async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
        try {
            const {data} = await axios(url);
            return data.articles;
        } catch (error) {
            console.log(error);
        }
    },
);


const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        clearNewsList: (state) => {
            state.newsList = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.newsList = action.payload;
                state.loading = false;
            })
            .addCase(getNews.rejected, (state) => {
                state.loading = false;
            });
    },
});

//! baska slice'lardaki tanimlanan action'lara cevap vermek
//! bilhassa createAsyncThunk tarafindan olusturulan action'lara cevap vermek icin kullanilir.


export const { clearNewsList } = newsSlice.actions;

export default newsSlice.reducer;