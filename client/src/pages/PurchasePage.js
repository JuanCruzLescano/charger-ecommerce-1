import React from "react";
import { connect } from "react-redux";
import Purchase from "../components/Payment";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { getOrders } from "../store/actions";




const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function PurchasePage({ user, orders, getOrders }) {
  React.useEffect(() => {
    if (user) getOrders(user.id);
  }, [user]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid item xs={6}>
          <Purchase orders={orders} user={user} getOrders={getOrders} />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    orders: state.orders,
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOrders: (userId) => dispatch(getOrders(userId)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasePage);
