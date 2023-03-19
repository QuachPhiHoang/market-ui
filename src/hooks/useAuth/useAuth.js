import { useDebugValue } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '~/routes/ProtectedRoute';

function useAuth() {
    // const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.user);
    // const { isLoggedIn } = useSelector((state) => state.user.isLoggedIn);
    // const { error } = useSelector((state) => state.user.error);
    useDebugValue(Object.keys(user).length > 0 ? 'isLoggedIn' : 'isLoggedOut');
    return ProtectedRoute({ user, isAuthenticated });
}

export default useAuth;
