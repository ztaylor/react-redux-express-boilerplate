import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Input, Button, Checkbox, DatePicker, TimePicker, InputNumber, Slider, Switch } from 'antd';
import 'antd/dist/antd.css';
import './index.css';

const { RangePicker } = DatePicker;

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.getIncomeContribution = this.getIncomeContribution.bind(this);
        this.handleDisabledChange = this.handleDisabledChange.bind(this);
        this.onFinish = this.onFinish.bind(this);

        this.state = {
            name: '',
            disabled: false,
            incomeSlider: 0,
            incomeField: 0,

            layout: {
                labelCol: {
                    span: 70,
                },

                wrapperCol: {
                    span: 16,
                },
            },
            tailLayout: {
                wrapperCol: {
                    offset: 8,
                    span: 16,
                },
            }
        };
    }

    handleDisabledChange = disabled => {
        this.setState({ disabled });
    };

    getIncomeContribution = async (runDate, income) => {
        const res = await fetch('http://localhost:3000/v1/national-insurance', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ runDate: runDate, income: income })
        });

        try {
            const contribution = await res.json();
            window.alert('Name: ' + this.state.name + ' Income: ' + contribution.income +
                ' Your NI Contribution: ' + contribution.ni);
        }
        catch (ex) {
            window.alert('There was an error with your request, check your fields or enter a new date');
        }
    }

    onFinish = async (fieldsValue) => {
        const rangeValue = fieldsValue['range-picker'];
        const values = {
            ...fieldsValue,
            'rangePicker': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')],
        };

        this.setState({ name: values.Name });
        const date = values.rangePicker[0].toString();
        const income = (this.state.disabled) ? this.state.incomeField : this.state.incomeSlider;
        await this.getIncomeContribution(date, income);
    };

    /****************************************************/
    //               Getters and Setters
    /****************************************************/

    incomeSlider = (value) => this.setState({ incomeSlider: value });

    incomeField = (value) => this.setState({ incomeField: value });

    /****************************************************/

    render() {
       // this.getIncomeContribution("2020-04-06", 21029);

        const { disabled } = this.state;

        const form_css = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '15rem',
            height: '28rem',
            borderRadius: '10px',
            background: '#e6e5e7',
        }

        const title_css = {
            position: 'absolute',
            fontFamily: "Times New Roman",
            justifyContent: "center",
            top: '25px',
            fontWeight: '700'
        }

        return (
            <Form
                {...this.state.layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={this.onFinish}
                style={form_css}
            >
                <h6 id="title" style={title_css}>National Insurance Contributions</h6>

                <div class="center">
                    <Form.Item
                        label="Name"
                        name="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Income"
                        name="Income"
                    >
                        <Slider name="incomeSlider" label="incomeSlider" defaultValue={30} min={0} max={100000}
                            onChange={this.incomeSlider} disabled={disabled}
                            style={{ position: 'absolute', top: '0px', width: '90%' }} />
                        <div class="income">
                            <p style={{ position: 'absolute', top: '40px', left: '-50px', fontSize: '11px' }}>Enter  Manually:</p>
                            <Switch size="small" checked={disabled} onChange={this.handleDisabledChange}
                                style={{ position: 'absolute', top: '40px', left: '28px' }} />
                            <InputNumber name="incomeField" label="incomeField" min={1}  defaultValue={3} size="small"  disabled={!disabled}
                                onChange={this.incomeField} style={{ position: 'absolute', top: '36px', left: '70px' }} />
                        </div>

                    </Form.Item>
                    <br />

                    <Form.Item
                        label="Date"
                        name="Date"
                        name="range-picker"
                        rules={[
                            {
                                required: true,
                                message: 'Please specify start and end date',
                            },
                        ]}
                    >

                        <RangePicker
                            style={{ position: 'absolute', top: '0px', left: '0px', width: '10rem' }} />
                    </Form.Item>
                </div>

                <Button type="primary" htmlType="submit" style={{ position: 'absolute', top: '380px', left: '140px' }}>Submit</Button>
            </Form>







        );
    }


}

export default Home;


