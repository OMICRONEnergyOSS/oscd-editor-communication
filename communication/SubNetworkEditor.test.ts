import { fixture, html } from '@open-wc/testing';

import { sendMouse, setViewport } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import { docBlob, orphanSubNetwork } from '../communication.testfiles.js';

import { SubNetworkEditor } from './SubNetworkEditor.js';

customElements.define('subnetwork-editor', SubNetworkEditor);

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);

describe('Subnetwork editor component', () => {
  let editor: SubNetworkEditor;

  describe('with valid Subnetwork passed', () => {
    beforeEach(async () => {
      const subnetwork = new DOMParser()
        .parseFromString(docBlob, 'application/xml')
        .querySelector('SubNetwork')!;

      editor = await fixture(
        html`<subnetwork-editor .element="${subnetwork}"></subnetwork-editor>`,
      );
      document.body.prepend(editor);
    });

    afterEach(() => {
      editor.remove();
    });

    describe('with unfocused subnetwork-editor', () => {
      it('looks like the latest snapshot', async () => {
        await setViewport({ width: 800, height: 600 });

        await editor.updateComplete;
        await timeout(400);
        await visualDiff(
          document.body,
          `subnetwork-editor/#1 Unfocused subnetwork-editor`,
        );
      });
    });

    describe('with focused subnetwork-editor', () => {
      it('looks like the latest snapshot', async () => {
        await setViewport({ width: 800, height: 600 });

        await sendMouse({ type: 'move', position: [120, 120] });
        await sendMouse({ type: 'click', position: [120, 120] });

        await timeout(400);
        await visualDiff(
          document.body,
          `subnetwork-editor/#2 Focused subnetwork-editor`,
        );
      });
    });
  });

  describe('with orphan SubNetwork passed', () => {
    beforeEach(async () => {
      const subnetwork = new DOMParser()
        .parseFromString(orphanSubNetwork, 'application/xml')
        .querySelector('SubNetwork')!;

      editor = await fixture(
        html`<subnetwork-editor .element="${subnetwork}"></subnetwork-editor>`,
      );
      document.body.prepend(editor);
    });

    afterEach(() => {
      editor.remove();
    });

    it('looks like the latest snapshot', async () => {
      await setViewport({ width: 800, height: 600 });

      await editor.updateComplete;
      await timeout(400);
      await visualDiff(document.body, `subnetwork-editor/#3 Orphan SubNetwork`);
    });
  });
});
