/* eslint-disable @typescript-eslint/no-unused-expressions */
import { expect, fixture, html } from '@open-wc/testing';

import { SinonSpy, spy } from 'sinon';

import { isRemove } from '@openenergytools/scl-lib/dist/foundation/utils.js';

import { docBlob } from '../communication.testfiles.js';

import { SubNetworkEditor } from './SubNetworkEditor.js';
import { OscdEditDialogEvents } from '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog-events.js';

customElements.define('subnetwork-editor', SubNetworkEditor);

const subNet = new DOMParser()
  .parseFromString(docBlob, 'application/xml')
  .querySelector('SubNetwork')!;

describe('SubNetwork editor component', () => {
  let editor: SubNetworkEditor;

  let editEvent: SinonSpy;

  beforeEach(async () => {
    editor = await fixture(
      html`<subnetwork-editor .element="${subNet}"></subnetwork-editor>`,
    );

    editEvent = spy();
    window.addEventListener('oscd-edit-v2', editEvent);
    window.addEventListener(OscdEditDialogEvents.EDIT_EVENT, editEvent);
    window.addEventListener(OscdEditDialogEvents.CREATE_EVENT, editEvent);
  });

  it('sends a wizard edit request', () => {
    editor.edit.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.element).to.equal(subNet);
  });

  it('sends a wizard create request', () => {
    editor.add.click();

    expect(editEvent).to.have.been.calledOnce;

    const editWizard = editEvent.args[0][0].detail;
    expect(editWizard.parent).to.equal(subNet);
    expect(editWizard.tagName).to.equal('ConnectedAP');
  });

  it('allows to remove an existing GSE element', () => {
    editor.delete.click();

    expect(editEvent).to.have.been.calledOnce;
    expect(editEvent.args[0][0].detail.edit).to.satisfy(isRemove);
    expect(editEvent.args[0][0].detail.edit.node.tagName).to.equal(
      'SubNetwork',
    );
  });
});
