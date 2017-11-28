import expect from 'expect';
import { Meteor } from 'meteor/meteor';

import { validateNewUser } from "./users";

if (Meteor.isServer) {
  describe('Users', function() {
    it('it should allow valid email', function() {
      const testUser = {
        emails: [
          {
            address: 'test@example.com'
          }
        ]
      }
      const res = validateNewUser(testUser);

      expect(res).toBe(true);
    });

    it('it should reject invalid email', function() {
      const testUser = {
        emails: [
          {
            address: 'tet@exampl'
          }
        ]
      };

      expect(() => {
        validateNewUser(testUser);
      }).toThrow();
    })
  })
}
