import { StackNavigator } from 'react-navigation';

import SecuredNav from './SecuredNav';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Forgot from '../pages/Forgot';

const FreeNav = StackNavigator({
  Login: { screen: Login },
  Signup: { screen : Signup },
  Forgot: { screen: Forgot  }
  },{
    initialRouteName: 'Login'
  });

export default FreeNav;