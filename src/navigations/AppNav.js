import { SwitchNavigator } from 'react-navigation';
import FreeNav from '../navigations/FreeNav';
import SecuredNav from '../navigations/SecuredNav';

const AppNav = SwitchNavigator({
    FreeNav: FreeNav,
    SecuredNav: SecuredNav
},{
    initialRouteName: 'FreeNav'
});

export default AppNav;