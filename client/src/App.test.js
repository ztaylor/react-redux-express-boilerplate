import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe("Component validation", () => {  
  let classComponent
  beforeEach(() => {
    classComponent = shallow(<Home/>)
  })  

  it('displays 0 as a default value', () => {
    expect(classComponent.find("title").text()).toContain("National Insurance")    
  })
})
