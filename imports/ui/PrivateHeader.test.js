import { Meteor } from 'meteor/meteor';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

import { PrivateHeader } from './PrivateHeader';

configure({ adapter: new Adapter() });
var expect = require('chai').expect;

if (Meteor.isClient) {
  describe('Private header', function() {
    it('it should use Title prop as h1 text', function() {
      const title = 'test title here';
      const wrapper = mount (<PrivateHeader title={title} handleLogout={() => {}}/>);
      const h1Title = wrapper.find('h1').text();

      expect(h1Title).to.equal(title);
    });

    it('should call handleLogout on click', function () {
        // let spy = sinon.spy();
        // //  const spy = expect.createSpy();
        // const wrapper = shallow( <PrivateHeader title="Title" handleLogout={spy}/> );
        // wrapper.find('button').simulate('click');
        // expect(spy).toHaveBeenCalled();
      });
  });
}
