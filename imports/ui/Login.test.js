import { Meteor } from 'meteor/meteor';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

import { Login } from './Login';

configure({ adapter: new Adapter() });
var expect = require('chai').expect;

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

    it('should call handleLogout on click', function () {
        // let spy = sinon.spy();
        // //  const spy = expect.createSpy();
        // const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> );
        // wrapper.find('button').simulate('click');
        // expect(spy).toHaveBeenCalled();
      });
  });
}
