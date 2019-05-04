import React from "react";

import { Drawer } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import DocumentList from "./DocumentList";

const drawerWidth = 240;

const styles = {
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
};

const DocumentDrawer = ({ classes, ...otherProps }) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <DocumentList {...otherProps} />
    </Drawer>
  );
};

export default withStyles(styles)(DocumentDrawer);
