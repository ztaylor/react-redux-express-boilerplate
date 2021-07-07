import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Dropdown, Menu, DatePicker, message, Space, Tooltip } from 'antd';

export default class Data_ extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            action: false,

            /****************************************************/
            //               First Form Varibles
            /****************************************************/

            firstName: "",
            surname: "",
            email: "",

            /****************************************************/
            /****************************************************/
            //               Second Form Varibles
            /****************************************************/

            telephoneNo: "",
            gender: 'Male',
            dob: '',

            /****************************************************/

            comments: ''
        }
    }


    render() {


        return (
            <div>
                <Form /*onFinish={onFinish}*/>
                    <Form.Item>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
/* onChange={onChange}  style={{ position: 'relative', top: '85px', left: '-345px', width: '9rem' }} */


