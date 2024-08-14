import Currencies from "@/Views/Currencies/Currencies.vue";
import Users from "@/Views/Users/Users.vue";
import {createRouter, createWebHistory} from 'vue-router'
import Coins from "@/Views/Coins/Coins.vue";
import Bids from "@/Views/Bids/Bids.vue";
import Admins from "@/Views/Admins/Admins.vue";
import Login from "@/Views/Auth/Login.vue";
import CreateCoin from "@/Views/Coins/CreateCoin.vue";
import UpdateCoin from "@/Views/Coins/UpdateCoin.vue";
import CreateCurrency from "@/Views/Currencies/CreateCurrency.vue";
import UpdateCurrency from "@/Views/Currencies/UpdateCurrency.vue";
import CreateUser from "@/Views/Users/CreateUser.vue";
import UpdateUser from "@/Views/Users/UpdateUser.vue";
import CreateBid from "@/Views/Bids/CreateBid.vue";
import UpdateBid from "@/Views/Bids/UpdateBid.vue";
import CreateAdmin from "@/Views/Admins/CreateAdmin.vue";
import UpdateAdmin from "@/Views/Admins/UpdateAdmin.vue";
import Payments from "@/Views/Payments/Payments.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'Login',
            path: '/login',
            component: Login
        }, {
            name: 'Currencies',
            path: '/currencies',
            component: Currencies
        },{
            name: 'CreateCurrency',
            path: '/currencies/create',
            component: CreateCurrency
        }, {
            name: 'UpdateCurrency',
            path: '/currencies/update/:id',
            component: UpdateCurrency
        }, {
            name: 'Users',
            path: '/users',
            component: Users
        }, {
            name: 'CreateUser',
            path: '/users/create',
            component: CreateUser
        },{
            name: 'UpdateUser',
            path: '/users/update/:id',
            component: UpdateUser
        },{
            name: 'Coins',
            path: '/coins',
            component: Coins
        }, {
            name: 'CreateCoin',
            path: '/coins/create',
            component: CreateCoin
        }, {
            name: 'UpdateCoin',
            path: '/coins/update/:id',
            component: UpdateCoin
        },{
            name: 'Bids',
            path: '/bids',
            component: Bids
        }, {
            name: 'CreateBid',
            path: '/bids/create',
            component: CreateBid
        }, {
            name: 'UpdateBid',
            path: '/bids/update/:id',
            component: UpdateBid
        }, {
            name: 'Payments',
            path: '/payments',
            component: Payments
        },{
            name: 'Admins',
            path: '/admins',
            component: Admins
        }, {
            name: 'CreateAdmin',
            path: '/admins/create',
            component: CreateAdmin
        }, {
            name: 'UpdateAdmin',
            path: '/admins/update/:id',
            component: UpdateAdmin
        }, {
            name: '404',
            path: '/:pathMatch(.*)*',
            component: Users
        }]
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')

    if (!token && to.name !== 'Login') {
        return next({name: 'Login'})
    }

    if (token && to.name === 'Login') {
        return next({name: 'Users'})
    }

    next()
})
export default router