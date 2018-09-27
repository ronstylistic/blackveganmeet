import { StackNavigator } from 'react-navigation';
import Home from '../pages/Home';
import Message from '../pages/Message';
import Search from '../pages/Search';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import ViewProfile from '../pages/ViewProfile';
import SendMessage from '../pages/SendMessage';
import NearbyRestaurant from '../pages/NearbyRestaurant';
import NearbyGroceryStore from '../pages/NearbyGroceryStore';
const SecuredNav = StackNavigator({

    Home: { screen: Home },
    Message: { screen: Message },
    Search: { screen: Search },
    Profile: { screen: Profile },
    EditProfile: { screen: EditProfile },
    ViewProfile: { screen:  ViewProfile },
    SendMessage: { screen: SendMessage },
    NearbyRestaurant: { screen: NearbyRestaurant },
    NearbyGroceryStore: { screen: NearbyGroceryStore }
    },{ 
        headerMode: 'float',
        initialRouteName: 'Home'
    });


export default SecuredNav;