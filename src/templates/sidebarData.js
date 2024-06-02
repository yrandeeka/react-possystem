import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import HailIcon from '@mui/icons-material/Hail';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import CategoryIcon from '@mui/icons-material/Category';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

export const SidebarData=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        link:"/"
    },
    {
        title:"Users",
        icon:<PeopleIcon/>,
        link:"/users"
    },
    {
        title:"Suppliers",
        icon:<HailIcon/>,
        link:"/suppliers"
    },
    {
        title:"Customers",
        icon:<Diversity3Icon/>,
        link:"/customers"
    },
    {
        title:"Categories",
        icon:<CategoryIcon/>,
        link:"/categories"
    },
    {
        title:"Items",
        icon:<FormatAlignJustifyIcon/>,
        link:"/items"
    },
    {
        title:"Payments",
        icon:<ShoppingCartCheckoutIcon/>,
        link:"/payments"
    },
]