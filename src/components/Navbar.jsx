import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import {useNavigate} from 'react-router-dom';

// redux-toolkit
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../features/authSlice';

export default function Navbar() {

    const navigate = useNavigate()
    // const user = false; //dummy
    // redux-toolkit;
    // const user = useSelector( (state) => state.auth.user );
    const {user} = useSelector( (state) => state.auth );
    // console.log(user);
    const dispatch = useDispatch()
    
    
    const handleLogout = () => {
        // clear user data
        // redux-toolkit;
        dispatch(clearUser())
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
