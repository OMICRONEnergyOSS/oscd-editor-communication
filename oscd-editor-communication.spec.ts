/* eslint-disable @typescript-eslint/no-unused-expressions */
import { fixture, html } from '@open-wc/testing';
import {
  // suite,
  // test,
  // assert,
  expect,
  // beforeAll,
  // afterAll,
  beforeEach,
  afterEach,
  // vi,
} from 'vitest';
import { SinonSpy, spy } from 'sinon';

import { isInsert } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob, missingCommunication } from './communication.testfiles.js';

import OscdEditorCommunication from './oscd-editor-communication.js';
import { OscdEditDialogEvents } from '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog-events.js';

const doc = new DOMParser().parseFromString(docBlob, 'application/xml');
const missComm = new DOMParser().parseFromString(
  missingCommunication,
  'application/xml',
);

describe('Scl Communication Plugin', () => {
  customElements.define('oscd-editor-communication', OscdEditorCommunication);

  let editor: OscdEditorCommunication;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(
      html`<oscd-editor-communication
        .doc="${doc}"
      ></oscd-editor-communication>`,
    );

    editEvent = spy();
    editor.addEventListener('oscd-edit-v2', event => {
      editEvent(event);
      editor.editCount += 1;
    });
    editor.addEventListener(OscdEditDialogEvents.CREATE_EVENT, editEvent);
  });

  afterEach(() => {
    editor.remove();
  });

  it('sends a wizard create request on Fab click', () => {
    editor.add.click();

    expect(editEvent).to.have.been.calledOnce;

    const eventDetails = editEvent.args[0][0].detail;
    expect(eventDetails.parent).to.equal(doc.querySelector('Communication'));
  });

  it('create a Communication section parent element when missing', async () => {
    editor.doc = missComm;
    await editor.updateComplete;

    editor.add.click();

    expect(editEvent).to.have.been.calledTwice;

    const insert = editEvent.args[0][0].detail.edit;
    expect(insert).to.satisfy(isInsert);

    const createRequest = editEvent.args[1][0].detail;
    expect(createRequest.parent).to.equal(insert.node);
    expect(createRequest.tagName).to.equal('SubNetwork');
  });
});
