
## Redux Toolkit Ornegi


## `Kullanilan Kutuphaneler`

- `@reduxjs/toolkit` -> user token verisi tutmak için..
- `react-redux` -> user token verisi tutmak için..
- `axios` -> API'den veri çekmek..
- `react-router-dom` -> multipage application..
- `@mui/material-ui` -> styling
- `@emotion/react`
- `@emotion/styled`

## `Kullanilacak API`:

- https://newsapi.org/
  (Get Key butonuna tiklanarak key alinabilir)

  - API sadece development aşamasında (localhost) çalışıyor. Proje deploy edildiğinde API kullanılmaz oluyor. 

- URL:
  const url = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${API_KEY}`;

## `Kullanilacak Araclar`

- `Redux Dev Tools` : Chrome uzerinde calisan ve global state uzerinde yapilan tum degisikliklerin takip edilmesini saglayan tarayici uzantisidir. Indirmek icin [tiklayiniz.](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-ntp-icon)`


### 📂 Project folder structure

src/
 │
 |----readme.md   
 │
 ├─ assets/
 │   ├─ delete.png
 │   └─ ok.png
 │   
 ├─ components/
 │   ├─ counter/
 │   │  ├─ Counter.css
 │   │  └─ Counter.jsx
 │   │
 │   └─ todo/
 │      ├─ Todo.css
 │      ├─ Todo.jsx
 │      ├─ NodoInput.jsx
 │      ├─ TodoItem.jsx
 │      └─ TodoList.js
 │
 ├─ redux/
 │   ├─ actions/
 │   │  ├─ CounterActions.jsx
 │   │  └─ TodoActions.jsx
 │   │
 │   ├─ reducers/
 │   │  ├─ CounterReducers.jsx
 │   │  └─ TodoReducers.jsx
 │   │
 │   └─ types/
 │      ├─ CounterTypes.jsx
 │      └─ TodoTypes.jsx
 │   
 │   
 ├─ App.js
 ├─ İndex.css
 └─ index.js


- Redux Projemizi create ettik, fazlalık dosyaları sildik..


#### react-redux ve reduxjs-toolkit Kurulum (redux-toolkit kurulursa düz redux'a ihtiyaç kalmıyor.); 

```bash
# If you use Yarn:
yarn add @reduxjs/toolkit react-redux

# Or if you use npm:
npm install @reduxjs/toolkit react-redux
```


#### React Router Kurulum;

```bash
# with yarn
- yarn add react-router-dom

# with npm
- npm install react-router-dom
```


#### Material UI installation;

##### 1. Adım; MUI Installation

```bash
- yarn add @mui/material @emotion/react @emotion/styled
 # or
- npm install @mui/material @emotion/react @emotion/styled
```


- kurulduğunda şu paketler package.json'da görülmeli.
  
package.json
```json
...
  "dependencies": {
    "@emotion/react": "^11.14.0",
    "@emotion/styled": "^11.14.1",
    "@mui/material": "^7.3.4",
},
```


##### 2. Adım; Google Roboto Font Style Installation

- Roboto yazı tipi

- Material UI varsayılan olarak Roboto yazı tipini kullanır. Fontsource veya Google Fonts CDN aracılığıyla projenize ekleyin.

- 1. Yöntem -> Font kurulum;
  
```bash
- yarn add @fontsource/roboto
# or
- npm install @fontsource/roboto
```

- Daha sonra bunu giriş noktanıza (index.js, App.js) şu şekilde aktarabilirsiniz:

```js
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```



#### axios kullanımı;
  https://www.axios-http.com/docs/intro
```bash
- yarn add axios #or
- npm install axios
```





#### News comp.;
pages/News.jsx
```jsx
import React from 'react'

const News = () => {
  return (
    <div>News</div>
  )
}

export default News;
```


#### Navbar comp;
- Muiden bir Navbar componenti oluşturalım;

src/components/Navbar.jsx
```jsx
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1}}
          >
            UmitDev News
          </Typography>
          <Button color="inherit">
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
```



#### App.js;

App.js
```js
import './App.css';
import News from './pages/News';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <News/>
    </div>
  );
}

export default App;
```


- Logoyu tıklanıldığında home page'e gönderir hale getirilmesi;
- Login/Logout condition;

Navbar.jsx
```jsx
...
import {useNavigate} from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate()
  ...
            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer'}}
            onClick={()=>navigate('/')}
          >
            UmitDev News
          </Typography>
...
```


#### Router işlemleri;

- src içinde router klasörü altında AppRouter ve  PrivateRouter dosyalarını oluşturalım ve App.js'de AppRouter'ı render edelim;

AppRouter.jsx
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import News from "../pages/News";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<News />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;
```


#### PrivateRouter işlemleri;

- dummy user verisi koşullu private router yapısını kurgulayalım;

PrivateRouter.jsx
```jsx
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRouter = () => {
    
    const user = true; // dummy

  return user ? <Outlet/> : <Navigate to='/login'/>;
}

export default PrivateRouter;
```


AppRouter.jsx
```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import News from "../pages/News";
import PrivateRouter from "./PrivateRouter";

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <Routes>
            <Route path="/" element={<PrivateRouter />}>
                <Route path="" element={<News />}/>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;
```


- Navbar'da user verisine göre login/logout linklerinin gösterilmesi;
- Login/Logout condition;

Navbar.jsx
```jsx
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {useNavigate} from 'react-router-dom';

export default function Navbar() {

    const navigate = useNavigate()
    const user = true; //dummy
    
    const handleLogout = () => {
        // clear user data
        navigate('login')
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer'}}
            onClick={()=>navigate('/')}
          >
            UmitDev News
          </Typography>

          {/* <Button color="inherit">
            Login
          </Button> */}
          {user ? 
            <Button color="inherit" onClick={handleLogout}>
                Logout
            </Button> 
            :           
            <Button color="inherit" onClick={()=>navigate('/login')}>
                Login
            </Button>
          }

        </Toolbar>
      </AppBar>
    </Box>
  );
}
```



#### Login page;

- Muiden bir Login componenti oluşturalım;

src/pages/Login.jsx
```jsx

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="avatar_img"
          src="https://cdn.pixabay.com/photo/2017/03/21/02/00/user-2160923_960_720.png"
          sx={{ width: 100, height: 100 }}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>

      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://www.clarusway.com/">
          Clarusway
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Container>
  );
}
```

- Login page'deki form-submit/onSubmit event'ine yazdığımız handleSubmit fonksiyonunda; formu temizleyip, formdaki email ve password verisini user state'ine aktaracağız, ve yine email ve password verisini state'lerden temizleyeceğiz, kullanıcıyı home page'e yönlendireceğiz.

Login.jsx
```jsx
...
import { useNavigate } from 'react-router-dom';
...

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO email, password => user state
    setEmail('');
    setPassword('');
    navigate('/')
  };
...
```

- Artık user state işlemlerine başlayabiliriz.


#### redux-toolkit işlemleri;

- best-practice; 
  - 1. `app` klasörü oluşturma;
  - src içerinde bir `app` klasörü oluşturulup içinde `store.jsx/store.js` isminde bir dosya oluşturulur.

  - 2. `features` klasörü oluşturma;
  - yine src içinde, diğer tüm redux logic'ini yerleştirmek için `features` isminde bir klasör oluşturulur.
    - redux klasörü gibi düşünülebilir; actions, reducers vs. vardı.
    - toolkit kullanılıyorsa hepsi bir yerde yapılabiliyor. Buna da `slice` deniyor. 
    - slice.jsx
      - Burada neleri state'te tutmak istiyoruz;
        - 1. state: login bilgileri -> authSlice.jsx
        - 2. state: API'den gelen veri -> newsSlice.jsx

- type'ı otomatik oluşturuyor, react-redux'deki gibi yazmaya gerek yok.
- Aslında bu bir reducer oluşturduk, içerisinde type'lar ve ction fonksiyonlar da var.

- 1. state olarak user authentication için authSlice yazalım; 

features/authSlice.jsx
```jsx
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: '',
};

//? createSlice, Redux state lojiğini kisa yoldan tanimlamak icin kullanilan bir metotdur.
//? slice : ismi, state'lerin baslangic degerleri ve reducer'lari key-value yapisi seklinde tanimlar.
//? reducer, state'i degistiren fonksiyonlarin yaninda otomatik olarak action type'larin tanimlanmasini da saglar.

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state, action) => {
            state.user = '';
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
```


- 2. state olarak API'den gelen veriler için de bir slice newsSlice yazalım (şimdilik boş); 
features/newsSlice.jsx
```jsx
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: '',
};


const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
    },
});

// export const { setUser, clearUser } = authSlice.actions;

export default newsSlice.reducer;
```

- Bu slice'ı oluşturduk, nasıl kullanacağız?
- Provider ile uygulamamızı sarmallamamız lazım. Şimdi store ve Provider kısmına gelelim.

- store kısımına geliyoruz;
  - Normalde react-redux'de iken createStore diye bir method vardı, onu kullanıyorduk.
  - Hem create edip, hem combine ediyorduk
  - Burada onun yerine configureStore methodunun kullanıyoruz. Bu method createStore'un basitleştirilmiş hali.

app/store.jsx
```jsx
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice';
import newsReducer from '../features/newsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        news: newsReducer,
    },
});

export default store;
```


- Şimdi artık store'u Provider ile App'te kullanacağız.

App.js
```jsx
...
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <div className="App">

      <Provider store={store} >
        <AppRouter/>
      </Provider>

    </div>
  );
}
...
```


- Buraya kadar;
  - authentication state'ini oluşturduk,
  - state'leri güncelledik, action'ları oluşturduk, reducerleri oluşturduk, store'u oluşturduk, Provider ile sarmalladık..
  - Consume/tüketme işlemi kaldı.
  - Bunun için login ve Navbar kısmında bunları kullanalım.

- Navbarda user giriş yaptı ise; bunu user'da okumalıyız.

Navbar.jsx
```jsx
...
// redux-toolkit
import { useSelector } from 'react-redux';
...
    const navigate = useNavigate()
    // const user = false; //dummy
    // redux-toolkit;
    // const user = useSelector( (state) => state.auth.user );
    const {user} = useSelector( (state) => state.auth );
...
```


- Login'de handleSubmit içinde user verisini state'e kaydetme;
  - 

login.jsx
```jsx 
...
// redux-toolkit;
import { useDispatch } from 'react-redux';
import { setUser } from '../features/authSlice';
...
  // redux-toolkit;
  const dispatch = useDispatch()
...
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO email, password => user state
    // redux-toolkit;
    dispatch(setUser({ email, password }))

    setEmail('');
    setPassword('');
    navigate('/')
  };
...
``` 

- PrivateRouter'daki dummy user verisini silip, useSelector ile global state'den çekiyoruz.

PrivateRouter.jsx
```jsx
...
import { useSelector } from 'react-redux';

const PrivateRouter = () => {
    
    // const user = useSelector(state => state.auth.user)
    const {user} = useSelector(state => state.auth)

  return user ? <Outlet/> : <Navigate to='/login'/>;
}
...
```

- Login işlemi tamam; 
  - user email, password girince bizi home page'e yönlendiriyor ve news yazısını görüyoruz. 



- Navbarda user logout işlemini yapalım;

Navbar.jsx
```jsx
...
// redux-toolkit
import { useSelector, useDispatch } from 'react-redux';
...
    const dispatch = useDispatch()
...
    const handleLogout = () => {
        // clear user data
        // redux-toolkit;
        dispatch(clearUser())
        navigate('login')
    }
...
```


### news kısmına geçelim;

- API'den veriçekerek gösterim yaptığımız New.jsx componentini oluşturalım;
- Mui'den yararlanarak componentimizi oluşturuyoruz,
- bir de loading gif ekliyoruz,

News.jsx
```jsx
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import loadingGif from '../assets/loading.gif';

const News = () => {

  return (
    <>
      <h1>News</h1>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
        </Box>
        <Box
          xs={{ d: 'flex' }}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {[]?.map((item, index) => (
            <Card sx={{ maxWidth: 345, m: 5, maxHeight: 600 }} key={index}>
              <CardMedia
                component="img"
                height="250"
                image={item?.urlToImage}
                alt="img"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" href={item?.url} target="_blank">
                  Detail
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
    </>
  );
};

export default News;
```


- Şimdi hazırladığımız bu News.jsx dosyamızda API'yi sergileyeceğiz.

- Peki API'den veriyi nerede çekeceğiz? 
  - API'den veriyi ... 'da çekip redux-toolkit ile global state'e atıp orada barındırıp, News'de consume/tüketme yapacağız.


- newSlice.jsx'de eksik kalan kısımları tamamlayacağız.
  
  - newsSlice'ın fonksiyonları olan action, creator'ları yazıp reducer'ı tamamlamamız lazım.
  
  - API'den veriyi burada çekeceğiz.
  - Önce news'leri temizlemek için; reducers'de clearNewsList() fonksiyonu yazdık,
  
  - Burada bir hassas durum var; eğer redux'la beraber bir async yapı kullanmak gerekiyorsa (API'den axios'la veri çekeceğiz, bu bir async yapıdır.) ekstra bir yazılım/interface kullanmak gerekiyor. Buna da `middleware`  deniyor.
    - redux state lojiğinde sistem şöyle çalışıyor;
      - UI tarafında bir state değişim isteğinde bulununca, bu dispatch haline getiriliyor ve reducer'lara iletiliyor.
      - Eğer bu istek bir API'den (dış bir kaynaktan) geliyorsa, hemen dispatch haline getirdiğimizde henüz daha veri gelmiş olmuyor. dispatch haline getirmeden önce API'den istek yapılacak, API'den gecikmeli olarak response gelecek, sonra gelen veri dispatch haline getirilip state güncellenecek. 
      - Bu gibi durumlarda doğrudan hemen gönderdiğimiz dispatch'i state yazmak doğru değil.
      - dispatch evet istek yapıyor ama, önce bunun API'ye gitmesi, API'den gelen response'un dönmesi, bu dönen response'a göre yeniden bir action objesi oluşturup onunla store'a göndermemiz lazım. Burada araya bir yazılım, ekstra bir interface ara birim giriyor. Bu ara birime middleware denir.
      - API'deki bu asynchron yapı state'deki senchron yapıyı bozuyor. Bu state yapısındaki synchron yapıyı bozan bu asynchron yapıyı middleware ile bir nevi geciktiriyoruz. 
      - middleware, gelen isteği alıp API'ye gönderiyor, dönen response'u action haline getirip, ondan sonra reducer'e sunuyor.
      - reducer'de pure-function çalışıyor, API'deki asynchron mantık pure-function mantığını bozuyor. middleware bunu pure-functiona çeviriyor. gelen response'u alıp reducer'in anlayabileceği formata çeviriyor.
  

- State'lerin API gibi async kaynaklardan gelen verilere gore guncellenmesi gerekebilir.
- Ancak boyle bir durumda async islem tamamlandiktan sonra state guncellenmelidir.
- Gonderilen api istegi ile dogrudan state guncellenmemelidir.
- Islemin tamamlanmasi ile gelen veriye gore state'in guncellenemsini saglamak için bir arabirim kullanilmaktadir.
- Bu arabirime middleware denilir.Redux-Toolkit, default olarak Thunk kullanmaktadir.
- Thunk'ın amaci reducers'a islenmis sonuclari gondermeden once gecikmeli asenkron ismlerinin yurutulmesini saglamaktir.


  - Redux için kullanılan middleware'ler içinde en bilineni (kullandığımız redux-toolkit'inde default) `thunk`
  
  - Redux `saga` da var. saga nın birkaç avantajı var, büyükprojelerde saga'da kullanılıyor. 

  - Burada API'den veri çekerken kullanacağımız middleware `thunk` olacak. 
  - Bunun için toolkit içerisinde `createAsyncThunk()` diye bir method oluşturmuşlar ve biz onu kullanacağız.
  
  - Not: redux-toolkit kullanmadan bu işlem biraz daha zahmetli oluyor. toolkit'in avantajlarından biri bu. (toolkit kullanmadan redux ile yapılmış proje de var.)
   
- `createAsyncThunk()` parametre olarak bir `string` ve `payloadCreateor` alıyor.
  
- 1. ilk parametre, bu strin aslında AsyncThunk'ın oluşturacağı action'ın type'ları gibi bir type oluşturacağız, 
- 'news/getNews' yazarak; createAsyncThunk()'ın yapacağı action bu type ile gelecek.

- 2. ikinci parametre olarak, bir async fonksiyon yazarak API'den veri çekiyoruz.
  - axios veya fetch ile API'den veri çekeceğiz.  

- API -> https://newsapi.org/docs/get-started

const API_KEY = '535614d33ce549c1a22ff4d924b213e7';

- API_URL: 'https://newsapi.org/v2/top-headlines?country=us&apiKey=API_KEY'

- Async bir yapı varsa middleware kullanıyoruz, 
- thunk middleware kullandığımızda da exstraReducers ile de thunk'ık oluşturduğu life-cycle'ları yani state'leri düzenliyoruz.

newsSlice.jsx
```jsx
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
```


- Şimdi artık bu UI tarfında consume/tüketme kullanacağız.
- News componentinde kullanacağız.

News.jsx
```jsx
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import loadingGif from '../assets/loading.gif';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getNews } from '../features/newsSlice';
import { clearNewsList } from '../features/newsSlice';

import { useEffect } from 'react';

const News = () => {

  const dispatch = useDispatch();
  const { newsList, loading } = useSelector((state) => state.news);
  
  //? component yüklendiğinde haberleri çekmek için useEffect kullanabiliriz.
  useEffect(() => {
    dispatch(getNews());
    // willUnmount cleanup için boş bir fonksiyon döndürüyoruz.
    return () => {
      dispatch(clearNewsList());
    };
  }, [dispatch]);
  
  return (
    <>
      {/* <h1>News</h1> */}
      {loading && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <img src={loadingGif} alt="gif" width="90%" height="800px" />
        </Box>
      )}
      {!loading && (
        <Box
          xs={{ d: 'flex' }}
          display="flex"
          alignItems="center"
          justifyContent="space-evenly"
          flexWrap="wrap"
        >
          {newsList?.map((item, index) => (
            <Card sx={{ maxWidth: 345, m: 5, maxHeight: 600 }} key={index}>
              <CardMedia
                component="img"
                height="250"
                image={item?.urlToImage}
                alt="img"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.content}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small" href={item?.url} target="_blank">
                  Detail
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
};

export default News;
```







- Ders bitti, node_modules'ü sildik.
- Projeyi çalıştırmak için;

#### node_modules yüklü olmayan (github'dan clone'lanan) projeyi önce node_module yükleyip sonra çalıştırmak için;

```zsh
- yarn  
- yarn start 
```

- or/veya

```zsh
- npm install
- npm start
```
