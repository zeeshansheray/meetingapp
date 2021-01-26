import React from 'react';
import { makeStyles } from "@material-ui/core/styles"
import Meeting from './Meeting';
import Mymeetings from './Mymeetings';
import Userchat from './UserChat';
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";

import {
    DesktopOutlined,
    HomeOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
    drawerPaper: { width: 'inherit' },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
    }
}))

export default function Sidebar() {
    const classes = useStyles();

    const logoutClicked = () => {
        localStorage.removeItem('Token');
        window.location.href=('/');
    }

    return (
        <Router>
            <div style={{ display: 'flex' }}>
                <Drawer
                    style={{ width: '220px' }}
                    variant="persistent"
                    anchor="left"
                    open={true}
                    classes={{ paper: classes.drawerPaper }}
                >
                    <List >
                        <Link to="/profile" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <HomeOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Home"} />
                            </ListItem>
                        </Link>
                        <Link to="/meeting" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <DesktopOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Invite Meeting"} />
                            </ListItem>
                        </Link>
                        <Link to="/invites" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <DesktopOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Invited Meetings"} />
                            </ListItem>
                        </Link>
                        <Link to="/chat" className={classes.link}>
                            <ListItem button>
                                <ListItemIcon>
                                    <DesktopOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Messages"} />
                            </ListItem>
                        </Link>
                        <Link className={classes.link} onClick={logoutClicked}>
                            <ListItem button>
                                <ListItemIcon>
                                    <LogoutOutlined />
                                </ListItemIcon>
                                <ListItemText primary={"Logout"} />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
                <Switch>
                    <Route exact path="/profile">
                        <Container>
                            <Typography variant="h3" gutterBottom style={{ textAlign: 'center' }}>
                                Welcome User
              </Typography>
              <h3>Email: {localStorage.getItem('User')}</h3>
                        </Container>
                    </Route>
                    <Route exact path="/meeting">
                        <Container>
                            <Meeting />
                        </Container>
                    </Route>
                    <Route exact path="/invites">
                        <Container>
                           <Mymeetings/>
                        </Container>
                    </Route>
                    <Route exact path="/chat">
                        <Container>
                           <Userchat/>
                        </Container>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
} 
