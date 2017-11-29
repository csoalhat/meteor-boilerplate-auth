import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
  describe('Notes', function() {
    const noteOne = {
      _id: 'testNoteId',
      title: 'this is title',
      body: 'this is body',
      updatedAt: 0,
      userId: 'testUserId'
    };

    beforeEach(function() {
      Notes.remove({});
      Notes.insert(noteOne);
    });

    it('it should insert new note', function() {
      const userId = 'testId';
      const _id = Meteor.server.method_handlers['notes.insert'].apply({userId});

      expect(Notes.findOne({_id, userId})).toBeTruthy();
    });

    it('it should not insert new note if not authenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.insert']();
      }).toThrow();
    });

    it('it shoud remove new note', function() {
      Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, [noteOne._id]);
      expect(Notes.findOne({_id: noteOne._id})).toBeFalsy();
    });

    it('it should not remove note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('it should not remove note if invalid note id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.remove'].apply({userId: noteOne.userId}, []);
      }).toThrow();
    });

    it('it should update note', function() {
      const title = 'This is new title';
      Meteor.server.method_handlers['notes.update'].apply({
        userId: noteOne.userId
      }, [
        noteOne._id,
        { title }
      ]);

      const note = Notes.findOne(noteOne._id);

      expect(note.updatedAt).toBeGreaterThan(0);
      expect(note).toMatchObject({
        title,
        body: noteOne.body
      });
    });

    it('it should not update if extra updates', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({
          userId: 'noteOne.userId'
        }, [
          noteOne._id,
          { title: 'new title', name:'new name' }
        ]);
      }).toThrow();
    });

    it('it should not update note if user was not creator', function() {
      Meteor.server.method_handlers['notes.update'].apply({
        userId: 'nonCreatorUserId'
      }, [
        noteOne._id,
        { title: 'new title' }
      ]);

      const note = Notes.findOne(noteOne._id);
      expect(note).toMatchObject(noteOne);
    });

    it('it should not update note if unauthenticated', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
      }).toThrow();
    });

    it('it should not update note if invalid note id', function() {
      expect(() => {
        Meteor.server.method_handlers['notes.update'].apply({userId: noteOne.userId}, []);
      }).toThrow();
    });

  });
}
