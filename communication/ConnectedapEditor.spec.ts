/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, fixture, html } from '@open-wc/testing';

import { SinonSpy, spy } from 'sinon';

import { isRemove } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob } from '../communication.testfiles.js';

import { ConnectedAPEditor } from './ConnectedapEditor.js';
import { OscdEditDialogEvents } from '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog-events.js';
customElements.define('connectedap-editor', ConnectedAPEditor);

const connAp = new DOMParser()
  .parseFromString(docBlob, 'application/xml')
  .querySelector('ConnectedAP')!;

describe('ConnectedAP editor component', () => {
  let editor: ConnectedAPEditor;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(
      html`<connectedap-editor .element="${connAp}"></connectedap-editor>`,
    );

    editEvent = spy();
    window.addEventListener('oscd-edit-v2', editEvent);
    window.addEventListener(OscdEditDialogEvents.EDIT_EVENT, editEvent);
  });

  it('sends a wizard edit request', () => {
    editor.edit.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.element).to.equal(connAp);
  });

  it('allows to remove an existing GSE element', () => {
    editor.delete.click();

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail.edit).to.satisfy(isRemove);
    expect(editEvent.args[0][0].detail.edit.node.tagName).to.equal(
      'ConnectedAP',
    );
  });
});
