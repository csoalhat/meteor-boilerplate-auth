import { Meteor } from 'meteor/meteor';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

import { Login } from './../imports/ui/Login';

configure({ adapter: new Adapter() });

var chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies);
var should = chai.should()
  , expect = chai.expect;

if (Meteor.isClient) {
  describe('Login header', function() {
    it('it should show error messages', function() {
      const error = 'This is error message';
      const wrapper = shallow (<Login loginWithPassword={()=>{}} />);

      wrapper.setState({ error });
      expect(wrapper.find('p').text()).to.equal(error);

      wrapper.setState({error: ''});
      expect(wrapper.find('p').length).to.equal(0);
    });

    it('should call loginWithPassword with form data', function () {
      // const email = 'test@test.com';
      // const password = 'test123';
      //
      // const spy = chai.spy();
      // const wrapper = shallow( <Login loginWithPassword={spy}/> );
    });

    it('should set loginWithPassword callback errors', function () {

    });
  });
}
