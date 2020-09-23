import React, {useState, useEffect} from 'react'
import {
    getCategories,
    addCategory,
    deleteCategory,
    modifyCategory,
    getProducts,
    deleteProduct,
    addProduct,
    addCategoryProduct,
    modifyProduct,
    removeCategoryProduct,
    getAllUsers,
    makeAdmin,
    deleteUser,
    getUserReviews,
    modifyReview,
    deleteReviews,
    getOrders,
    allOrders,
    getAllOrders,
    modifyOrdersState
} from '../store/actions'
import {connect} from 'react-redux'
import NavBar from '../components/NavBar/Container'
import {
    createMuiTheme,
    ThemeProvider,
    makeStyles,
} from '@material-ui/core/styles'
import {Tab, Tabs, AppBar, CssBaseline} from '@material-ui/core'
import CreateProducts from '../components/AdminForms/CreateProducts'
import EditProduct from '../components/AdminForms/EditProduct'
import DeleteProduct from '../components/AdminForms/DeleteProduct'
import AddCategory from '../components/AdminForms/AddCategory'
import EditCategory from '../components/AdminForms/EditCategory'
import DeleteCategory from '../components/AdminForms/DeleteCategory'
import Tables from '../components/AdminForms/Tables'
import ListUsers from '../components/AdminForms/ListUsers'
import SeeReviews from '../components/SeeReviews'
import ListOrders from '../components/AdminForms/ListOrders.js'

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
})

function AdminPage({
    categories,
    products,
    getCategories,
    getProducts,
    addCategory,
    addProduct,
    deleteCategory,
    deleteProduct,
    modifyCategory,
    addCategoryProduct,
    removeCategoryProduct,
    modifyProduct,
    getAllUsers,
    deleteUser,
    makeAdmin,
    users,
    deleteReviews,
    modifyReview,
    getUserReviews,
    user,
    getOrders,
    reviews,
    allOrders,
    getAllOrders,
    modifyOrdersState
}) {
    const [selectedTab, setSelectedTab] = React.useState(0)

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue)
    }

    useEffect(() => {
        if(user) {
            getOrders(user.id)
        }
    }, [])

    return (
        <>
            <NavBar />
            <ThemeProvider theme={darkTheme}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        style={{marginTop: '4em'}}
                        variant="scrollable"
                    >
                        <Tab label="Products and Categories" />
                        <Tab label="Create Products" />
                        <Tab label="Edit Products" />
                        <Tab label="Delete Products" />
                        <Tab label="Add Categories" />
                        <Tab label="Edit Categories" />
                        <Tab label="Delete Categories" />
                        <Tab label="Users" />
                        <Tab label="Orders" />
                    </Tabs>
                </AppBar>
                {selectedTab === 0 && (
                    <Tables
                        categories={categories}
                        products={products}
                        viewCategories={getCategories}
                        viewProducts={getProducts}
                        addCategoryProduct={addCategoryProduct}
                        removeCategoryProduct={removeCategoryProduct}
                    />
                )}
                {selectedTab === 1 && (
                    <CreateProducts addProduct={addProduct} />
                )}
                {selectedTab === 2 && (
                    <EditProduct modifyProduct={modifyProduct} />
                )}
                {selectedTab === 3 && (
                    <DeleteProduct deleteProduct={deleteProduct} />
                )}
                {selectedTab === 4 && <AddCategory addCategory={addCategory} />}
                {selectedTab === 5 && (
                    <EditCategory modifyCategory={modifyCategory} />
                )}
                {selectedTab === 6 && (
                    <DeleteCategory deleteCategory={deleteCategory} />
                )}
                {selectedTab === 7 && <ListUsers getAllUsers={getAllUsers} makeAdmin={makeAdmin} deleteUser={deleteUser} users={users} getUserReviews={getUserReviews} modifyReview={modifyReview} deleteReviews={deleteReviews} reviews={reviews} />}
		{selectedTab === 8 && (
		  <ListOrders allOrders={allOrders} getAllOrders={getAllOrders} modifyOrdersState={modifyOrdersState} /> 
                )}
            </ThemeProvider>
        </>
    )
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
        products: state.products,
        users: state.users,
        user: state.user,
        reviews: state.reviews,
        userReviews: state.userReviews,
        allOrders: state.allOrders,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCategories: () => dispatch(getCategories()),
        addCategory: (name, description, message) =>
            dispatch(addCategory(name, description, message)),
        deleteCategory: (id, message) => dispatch(deleteCategory(id, message)),
        modifyCategory: (id, name, description, message) =>
            dispatch(modifyCategory(id, name, description, message)),
        getProducts: () => dispatch(getProducts()),
        addProduct: (name, description, price, stock, img, message) =>
            dispatch(addProduct(name, description, price, stock, img, message)),
        deleteProduct: (id, message) => dispatch(deleteProduct(id, message)),
        addCategoryProduct: (productId, categoryId, message) =>
            dispatch(addCategoryProduct(productId, categoryId, message)),
        removeCategoryProduct: (productId, categoryId, message) =>
            dispatch(removeCategoryProduct(productId, categoryId, message)),
        modifyProduct: (id, name, description, price, stock, img, message) =>
            dispatch(
                modifyProduct(id, name, description, price, stock, img, message)
            ),
        getAllUsers: () => dispatch(getAllUsers()),
        deleteUser: (id, message) => dispatch(deleteUser(id, message)),
        makeAdmin: (id, message) => dispatch(makeAdmin(id, message)),
        getUserReviews: (userId) => dispatch(getUserReviews(userId)),
        deleteReviews: (reviewId, message) => dispatch(deleteReviews(reviewId, message)),
        getOrders: (userId) => dispatch(getOrders(userId)),
        modifyReview: (id, commentary, message)=> dispatch(modifyReview(id, commentary, message)),
        getAllOrders: () => dispatch(getAllOrders()),
        modifyOrdersState: (id, state) => dispatch(modifyOrdersState(id, state))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
