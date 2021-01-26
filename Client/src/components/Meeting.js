import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
} from "@material-ui/core";
import TextField from '@material-ui/core/TextField';

export default class Meeting extends Component {
    // const [time, setTime] =  useState(null);
    constructor() {
        super();
        this.state = {
            email: null,
            time: null,
        }
    }

    handleChange = async (event) => {
        console.log('event' + event.target.value);
        await this.setState({ time: event.target.value })
        console.log(this.state.time);
    };

    sendInvite = () => {
        var isValid = true;
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(this.state.email)) {
            isValid = false;
            toast.error('Please enter a valid email');
        }
        else {
            const obj = {
                time: this.state.time,
                email: this.state.email,
            }

            axios.post('http://localhost:4000/app/inviteuser', obj)
                .then(res => {
                    if (res.data.statu == 'error') {
                        toast.error('Cannot proceed your request')
                    }
                    else {
                        toast.success('Invitation is sent sucessfully')
                    }

                })

        }
    }

    render() {
        return (
            <Container>
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Typography variant="h3" gutterBottom style={{ textAlign: 'center' }}>
                    Invite Meeting
</Typography>
                <TextField id="standard-basic" label="User Email" onChange={(event) => this.setState({ email: event.target.value })} />
                <br /><br />
                <FormControl style={{ width: '12%' }}>
                    <InputLabel id="demo-simple-select-label">Meeting Time</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.state.time}
                        onChange={this.handleChange}
                    >
                        <MenuItem value={"2021-01-10T01:00:00.000"}>01:00 am</MenuItem>
                        <MenuItem value={"2021-01-10T03:00:00.000"}>03:00 am</MenuItem>
                        <MenuItem value={"2021-01-10T06:00:00.000"}>06:00 am</MenuItem>
                        <MenuItem value={"2021-01-10T08:00:00.000"}>08:00 am</MenuItem>
                        <MenuItem value={"2021-01-10T10:00:00.000"}>10:00 am</MenuItem>
                    </Select>
                    <Button variant="contained" onClick={this.sendInvite} color="primary" size="small" style={{ marginTop: '8%', width: '10%' }}>
                        Invite
</Button>
                </FormControl>
            </Container>
        )
    }
}