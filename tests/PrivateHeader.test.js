import { Meteor } from 'meteor/meteor';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';

import { PrivateHeader } from './../../imports/ui/PrivateHeader';

configure({ adapter: new Adapter() });

const chai = require('chai')
  , spies = require('chai-spies');
chai.use(spies);
const should = chai.should()
  , expect = chai.expect;

if (Meteor.isClient) {
  describe('Private header', function() {
    it('it should use Title prop as h1 text', function() {
      const title = 'test title here';
      const wrapper = mount (<PrivateHeader title={title} handleLogout={() => {}}/>);
      const h1Title = wrapper.find('h1').text();

      expect(h1Title).to.equal(title);
    });

    it('it should call handleLogout on click', function () {
      const spy = chai.spy();
      const wrapper = mount ( <PrivateHeader title="Title" handleLogout={spy}/> );
      wrapper.find('button').simulate('click');

      expect(spy).to.have.been.called();
      });
  });
}
