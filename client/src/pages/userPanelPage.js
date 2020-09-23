import React, { useState, useEffect } from 'react';
import { Box, AppBar, Tabs, Tab, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import TabPanel from '../components/TabPanel';
import UserCard from '../components/UserCard';
import NavBarContainer from '../components/NavBar/Container'
import OrderCard from '../components/orderCard';
import { getOrders, getUserReviews, deleteReviews, modifyReview } from '../store/actions';
import { Link } from 'react-router-dom';
import SeeReviews from '../components/SeeReviews';
import { AccountSettings } from '../components/AccountSettings';

const useStyle = makeStyles({
    content: {
        marginTop: '4em',
    },
    appbar: {
        backgroundColor: '#444',
        justifyContent: 'center',
        display: 'flex'
    },
    infoUser: {
        justifyContent: 'center',
        display: 'flex'
    }
})

function UserPanelPage ({user, orders, reviews, getOrders, userReviews, deleteReviews, getUserReviews, modifyReview}) {
    const [tab, setTab] = useState(2);

    const classes = useStyle();

    useEffect(() => {
        if(user)
            getOrders(user.id);
        }, [user]);

    useEffect(() => {
        if(user) {
            getUserReviews(user.id)
        }
    }, [])


    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function handleChange(e, newValue) {
        setTab(newValue);
    }

    return (
        <><NavBarContainer noTransparent={true}/>
        <Box compoent="div" className={classes.content}>
            <AppBar className={classes.appbar} position="static">
                <Tabs value={tab} onChange={handleChange}>
                    <Tab label="Information" {...a11yProps(0)} />
                    <Tab label="Orders" {...a11yProps(1)} />
                    <Tab label="Account Settings" {...a11yProps(2)} />
                    <Tab label="Reviews" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <div className={classes.infoUser}>

            {/* USER INFORMATION */}
            <TabPanel value={tab} index={0}  >
                {user && (<UserCard
                    name={`${user.name} ${user.lastName}`}
                    email={user.email}
                    address={user.address}
                    />)}
            </TabPanel>
            </div>

            {/* ORDERS */}
            <TabPanel value={tab} index={1}>
                {orders.map((order, index) => (
                    <Link to={`/order/${order.id}`} style={{textDecoration: 'none'}} key={index}>
                        <OrderCard
                            id={order.id}
                            status={order.state}
                            products={order.shoppingCart.content} />
                    </Link>
                ))}
            </TabPanel>

            {/* ACCOUNT SETTINGS */}
            <TabPanel value={tab} index={2}>
                  <div style={{backgroundColor: 'rgba(224, 224, 224, 0.4)', width: '100%', display: 'flex', height:'77vh', margin: 0, justifyContent: 'center', alignItems: 'center'}}>
                    {user && (<AccountSettings 
                          user={user}
                          />)
                    }  
                  </div>
            </TabPanel>

            {/* REVIEWS */}
            <TabPanel value={tab} index={3}>
                <SeeReviews reviews={reviews} userReviews={userReviews} deleteReviews={deleteReviews} getUserReviews={getUserReviews} user={user} modifyReview={modifyReview}/>
            </TabPanel>
        </Box>
        </>
    )
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
        user: state.user,
        userReviews: state.userReviews,
        reviews: state.reviews
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserReviews: (userId) => dispatch(getUserReviews(userId)),
        deleteReviews: (reviewId, message) => dispatch(deleteReviews(reviewId, message)),
        getOrders: (userId) => dispatch(getOrders(userId)),
        modifyReview: (id, commentary, message)=> dispatch(modifyReview(id, commentary, message))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPanelPage);
