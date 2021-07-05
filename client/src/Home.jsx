import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Router, Route, Switch } from 'react-router';
import { Redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';
import { Form, Input, Button, Dropdown, Menu, DatePicker, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import Data_ from './Data.js';
import 'antd/dist/antd.css';
import './index.css';

const { RangePicker } = DatePicker;
const history = createBrowserHistory();

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.register = this.register.bind(this);
        this.getUserData = this.getUserData.bind(this);
        this.handleDisabledChange = this.handleDisabledChange.bind(this);
        this.submitFirstForm = this.submitFirstForm.bind(this);
        this.submitSecondForm = this.submitSecondForm.bind(this);
        this.submitThirdForm = this.submitThirdForm.bind(this);
        this.openTab = this.openTab.bind(this);


        /****************************************************/
        //               Getters and Setters
        /****************************************************/

        this.setFirstName = this.setFirstName.bind(this);
        this.setSurname = this.setSurname.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setDateOfBirth = this.setDateOfBirth.bind(this);
        this.setComments = this.setComments.bind(this);

        /****************************************************/

        this.state = {
            action: false,
            redirect: [],
            id: 0,
            register: false,

            /****************************************************/
            //               First Form Varibles
            /****************************************************/

            firstName: '',
            surname: '',
            email: '',

            /****************************************************/
            /****************************************************/
            //               Second Form Varibles
            /****************************************************/

            telephoneNo: '',
            gender: 'Male',
            dob: '2000-01-01',

            /****************************************************/

            comments: ''
        }
    }

    componentDidMount() {
        document.getElementById('tab-details').checked = true;
        document.getElementById('tab-comments').checked = false;
        document.getElementById('tab-final-comments').checked = false;
        document.getElementById('tab-comments').disabled = true;
        document.getElementById('tab-final-comments').disabled = true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.action) {
            this.setState({ action: false });
        } else if (this.state.register) {
            this.register();


            this.setState({ register: false });
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.gender !== this.state.gender ||
            nextState.action !== this.state.action
            || nextState.register !== this.state.register)
            return true;
    }


    /****************************************************/
    //               Database Functions
    /****************************************************/

    // Save User Data to Database
    register = async () => {
        const firstname = this.state.firstName;
        const surname = this.state.surname;
        const emailAddress = this.state.email;
        const telephoneNo = this.state.telephoneNo.toString();
        const gender = this.state.gender;
        const dob = this.state.dob;
        const comments = this.state.comments;

        const res = await fetch('http://localhost:3000/v1/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstname: firstname, surname: surname, email_address: emailAddress, telephone: telephoneNo, gender: gender,
                dob: dob, comments: comments
            })
        });

        if (res.status !== 200) {
            message.info('There was an error submitting your form');
            return;
        }

        message.info('Form submitted successfully, your id is ' + res.json().id);

        // Clear Data Fields
        this.setState({ gender: 'Male' });
        this.setState({ firstname: '' });
        this.setState({ surname: '' });
        this.setState({ telephoneNo: '' });
        this.setState({ dob: '2000-01-01' });
        this.setState({ comments: '' });
        this.setState({ emailAddress: '' });
        this.setState({ action: true });

        // Reset Form
        document.getElementById('tab-details').checked = true;
        document.getElementById('tab-comments').checked = false;
        document.getElementById('tab-final-comments').checked = false;
        document.getElementById('tab-comments').disabled = true;
        document.getElementById('tab-final-comments').disabled = true;
    }

    // Get User Data
    getUserData = async () => {
        const res = await fetch('http://localhost:3000/v1/user?id='.concat(parseInt(this.state.id)))

        if (res.status !== 200) {
            message.info('Request Failed, id does not exist');
        }
        else {
            const data = await res.json();
            console.log('File created for user ' + data.firstname);
            message.info('File created for user ' + data.firstname);
        }
    }

    openTab = (e) => {
        console.log(e.target.checked);
        e.target.checked = true;
        console.log(e.target.checked);
    }

    /****************************************************/
    /****************************************************/
    //               Form Validation
    /****************************************************/

    submitFirstForm = (values) => {
        let flag = true;

        const firstName = this.state.firstName.trim();
        const surname = this.state.surname.trim();
        const email = this.state.email.trim();

        if (firstName.length !== 0 && firstName !== null && firstName !== undefined) {
            if (surname.length !== 0 && surname !== null && surname !== undefined) {
                if (email.length !== 0 && surname !== null && surname !== undefined) {
                    // Validate Email
                    const expression = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    const res = expression.test(String(email).toLowerCase());
                    if (res)
                        flag = false;
                    else
                        message.info('Please enter a valid email');
                } else
                    message.info('Please enter an email address');
            } else
                message.info('Please fill in your surname');
        } else
            message.info('Please fill in your first name');

        if (!flag) {
            // Couldn't find a workaround (Refs are bad practice) 
            document.getElementById('tab-comments').checked = true;
            document.getElementById('tab-comments').disabled = false;
            document.getElementById('tab-details').disabled = true;
            document.getElementById('tab-final-comments').disabled = true;
        }
    };

    submitSecondForm = () => {
        let flag = true;

        const telephone = this.state.telephoneNo.trim();
        const dob = this.state.dob.toString().trim();

        const mobile = /^((\+44(\s\(0\)\s|\s0\s|\s)?)|0)7\d{3}(\s)?\d{6}/;
        const landline = /\s*\(?(0[1-6]{1}[0-9]{3}\)?[0-9]{6})\s*/;
        const res1 = mobile.test(String(telephone).toLowerCase());

        const year = parseInt(dob.substring(0, 4));
        console.log('year ' + year);
        const isAlien = (year < 1821);

        if (telephone.length !== 0 && telephone !== null && telephone !== undefined || res1) {
            if (!isAlien) {
                flag = false;
            } else
                message.info('Are you an Alien?');
        } else
            message.info('Please enter a valid UK Telephone Number');

        if (!flag) {
            // Couldn't find a workaround (Refs are bad practice)
            document.getElementById('tab-final-comments').checked = true;
            document.getElementById('tab-final-comments').disabled = false;
            document.getElementById('tab-comments').disabled = true;
            document.getElementById('tab-details').disabled = true;
        }
    }

    submitThirdForm = () => {

        this.setState({ register: true });
    }

    /****************************************************/
    /****************************************************/
    //               Getters and Setters
    /****************************************************/

    setID = (value) => {
        this.setState({ id: value.target.value });
        this.setState({ action: true });
    }

    setFirstName = (value) => {
        this.setState({ firstName: value.target.value });
        this.setState({ action: true });
    }

    setSurname = (value) => {
        this.setState({ surname: value.target.value });
        this.setState({ action: true });
    }

    setEmail = (value) => {
        this.setState({ email: value.target.value });
        this.setState({ action: true });
    }

    setTelephoneNo = (value) => {
        this.setState({ telephoneNo: value.target.value });
        this.setState({ action: true });
    }

    setGender = (e) => {
        console.log('click', e.key);

        switch (parseInt(e.key)) {
            case 1:
                this.setState({ gender: 'Male' });
                break;
            case 2:
                this.setState({ gender: 'Female' });
                break;
            case 3:
                this.setState({ gender: 'Prefer Not To Say' });
                break;
        }
    }

    setDateOfBirth = (date, dateString) => {
        this.setState({ dob: dateString });
        this.setState({ action: true });
    }

    setComments = (values) => {
        this.setState({ comments: values });
        this.setState({ action: true });
    }

    /****************************************************/

    render() {
        const dateFormat = 'YYYY-MM-DD';
        const { TextArea } = Input;
        const { disabled } = this.state;

        const form_css = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '40rem',
            height: '20rem',
            borderRadius: '10px',
            background: '#e6e5e7',
            zIndex: '1'
        }

        const print_css = {
            position: 'absolute',
            top: '10%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }

        const formItemLayout = {
            labelAlign: "left"
        };

        const detailsButton =
        {
            position: 'absolute',
            left: '20px',
            top: '130px'
        }

        const thirdFormButton =
        {
            position: 'absolute',
            left: '-30px',
            top: '130px'
        }

        const menu = (
            <Menu onClick={this.setGender}>
                <Menu.Item key="1" icon={<UserOutlined />}>
                    Male
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    Female
                </Menu.Item>
                <Menu.Item key="3" icon={<UserOutlined />}>
                    Prefer Not To Say
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                {this.state.redirect}
                <div style={print_css}>

                    <Form /*onFinish={onFinish}*/
                        layout='inline'
                        onFinish={this.getUserData}
                    >
                        <Form.Item>
                            <Input onChange={this.setID} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Print
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
                <div class="form">
                    <Form
                        {...this.state.layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                    >
                        <input onClick={this.openTab} type="radio" id="tab-details" name="nav-tab" />
                        <input onClick={this.openTab} type="radio" id="tab-comments" name="nav-tab" />
                        <input onClick={this.openTab} type="radio" id="tab-final-comments" name="nav-tab" />

                        <ul class="nav-tabs">
                            <li id="details"><label for="tab-details">Step 1: Your Details</label></li>
                            <li id="comments"><label for="tab-comments">Step 2: More Comments</label></li>
                            <li id="final-comments"> <label for="tab-final-comments">Step 3: Final Comments</label></li>
                        </ul>

                        <div class="tab-content">
                            <div class="tab-pane content-details">
                                <Form
                                    layout='inline'
                                    onFinish={this.submitFirstForm}
                                >
                                    <Form.Item>
                                        <label style={{ position: 'absolute', top: '-10px', left: '-20px' }}>First Name</label>
                                        <div style={{ position: 'relative', top: '15px', left: '-22px', width: '9rem' }}>
                                            <Input onChange={this.setFirstName} placeholder="First Name" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item >
                                        <label style={{
                                            position: 'absolute', top: '-10px', left: '-20px'
                                        }}>Surname</label>
                                        <div style={{ display: 'inline-block', position: 'relative', top: '15px', left: '-22px', width: '9rem' }}>
                                            <Input onChange={this.setSurname} placeholder="Surname" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item

                                    >
                                        <label style={{
                                            position: 'absolute', top: '60px', left: '-340px'
                                        }}>Email Address</label>
                                        <div style={{ position: 'relative', top: '85px', left: '-345px', width: '10rem' }}>
                                            <Input onChange={this.setEmail} placeholder="Email Address" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item >
                                        <div style={detailsButton}>
                                            <Button type="primary" onClick={() =>
                                                this.setState({ action: true })} htmlType="submit">{`Next >`}</Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div class="tab-pane content-comments">
                                <Form
                                    layout='inline'
                                    onFinish={this.submitSecondForm}
                                >
                                    <Form.Item>
                                        <label style={{ position: 'absolute', top: '-10px', left: '-20px' }}>Telephone</label>
                                        <div style={{ position: 'relative', top: '15px', left: '-22px', width: '9rem' }}>
                                            <Input onChange={this.setTelephoneNo} placeholder="Telephone" />
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <label style={{
                                            position: 'absolute', top: '-10px', left: '-20px'
                                        }}>Gender</label>
                                        <div style={{ display: 'inline-block', position: 'relative', top: '15px', left: '-22px', width: '9rem' }}>
                                            <Dropdown overlay={menu}>
                                                <Button>
                                                    {this.state.gender}<DownOutlined />
                                                </Button>
                                            </Dropdown>
                                        </div>
                                    </Form.Item>
                                    <Form.Item>
                                        <label style={{
                                            position: 'absolute', top: '60px', left: '-340px'
                                        }}>Date Of Birth</label>
                                        <div style={{ position: 'relative', top: '85px', left: '-345px', width: '9rem' }}>
                                            <DatePicker onChange={this.setDateOfBirth} defaultValue={moment('2000-01-01', dateFormat)} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item >
                                        <div style={detailsButton}>
                                            <Button type="primary" onClick={() =>
                                                this.setState({ action: true })} htmlType="submit">{`Next >`}</Button>
                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                            <div class="tab-pane content-final-comments">
                                <Form
                                    layout='inline'
                                >
                                    <Form.Item>
                                        <div style={{ width: '35rem' }} >
                                            <TextArea placeholder="Comments..." allowClear
                                                autoSize={{ minRows: 5, maxRows: 20, minColumns: 10 }} />
                                        </div>
                                    </Form.Item>
                                    <Form.Item >
                                        <div style={thirdFormButton}>

                                            <Button onClick={this.submitThirdForm} type="primary">{`Next >`}</Button>

                                        </div>
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Home;


