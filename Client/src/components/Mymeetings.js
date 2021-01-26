import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@material-ui/core/Button';
import {
    Drawer, List, ListItem,
    ListItemIcon, ListItemText,
    Container, Typography,
} from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



export default class Meeting extends Component {
    // const [time, setTime] =  useState(null);
    constructor() {
        super();
        this.state = {
            meetings: [],
        }
    }
    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get('http://localhost:4000/app/viewInvites').then(res => {
            this.setState({
                meetings: res.data,
            })
            console.log('data' + JSON.stringify(this.state.meetings))
        })
    }

    acceptMeeting = (id) => {
        const object = {
            meetingId: id,
        };
        console.log('I am working')
        axios.post('http://localhost:4000/app/acceptMeeting', object).then(res => {
            console.log(res);
        })
        this.fetchData();
    }

    deleteMeeting = (id) => { 
        const object = {
            meetingId: id,
        };
        axios.post('http://localhost:4000/app/deleteMeeting', object).then(res => {
            console.log(res);
        })
        this.fetchData();

    }
 
    meetingTimeAdjust = (time) => {
        var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        console.log('timezone is ' + timezone)
        var d = new Date(time); /* midnight in China on April 13th */
        var adjustedTime = d.toLocaleString('en-US', { timeZone: timezone });
        return adjustedTime;
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
                    My Meetings
</Typography>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Meeting From</TableCell>
                                <TableCell >Meeting With</TableCell>
                                <TableCell>Meeting Date & Time</TableCell>
                                <TableCell>Time Zone</TableCell>
                                <TableCell >Action</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.meetings.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.meetingFrom}
                                    </TableCell>
                                    <TableCell >{row.meetingWith}</TableCell>
                                    <TableCell >{this.meetingTimeAdjust(row.meetingTime)}</TableCell>
                                    <TableCell>{Intl.DateTimeFormat().resolvedOptions().timeZone}</TableCell>

                                    <TableCell >{row.accepted ? <Button disabled variant="contained" size="small" color="primary">
                                        Accepted
</Button> : <Button variant="contained" size="small" color="primary" onClick={() => this.acceptMeeting(row._id)}>
                                            Accept
</Button>}</TableCell>                  <TableCell ><Button variant="contained" size="small" color="secondary" onClick={()=>this.deleteMeeting(row._id)}>
                                        Delete
</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        )
    }
}