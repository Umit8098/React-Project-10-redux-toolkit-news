import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRouter = () => {
    
    // const user = true; // dummy
    // const user = useSelector(state => state.auth.user)
    const {user} = useSelector(state => state.auth)

  return user ? <Outlet/> : <Navigate to='/login'/>;
}

export default PrivateRouter;