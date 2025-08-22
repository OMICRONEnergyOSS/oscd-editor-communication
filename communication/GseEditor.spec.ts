/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, fixture, html } from '@open-wc/testing';

import { SinonSpy, spy } from 'sinon';

import { isRemove } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob } from '../communication.testfiles.js';

import { GseEditor } from './GseEditor.js';
import { OscdEditDialogEvents } from '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog-events.js';

customElements.define('gse-editor', GseEditor);

const gse = new DOMParser()
  .parseFromString(docBlob, 'application/xml')
  .querySelector('GSE')!;

describe('GSE editor component', () => {
  let editor: GseEditor;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(html`<gse-editor .element="${gse}"></gse-editor>`);

    editEvent = spy();
    window.addEventListener('oscd-edit-v2', editEvent);
    window.addEventListener(OscdEditDialogEvents.EDIT_EVENT, editEvent);
  });

  it('sends a wizard edit request', () => {
    editor.edit.click();

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail.element).to.equal(gse);
  });

  it('allows to remove an existing GSE element', () => {
    editor.delete.click();

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail.edit).to.satisfy(isRemove);
    expect(editEvent.args[0][0].detail.edit.node.tagName).to.equal('GSE');
  });
});
