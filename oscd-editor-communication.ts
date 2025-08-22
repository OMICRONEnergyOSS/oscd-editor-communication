import { LitElement, TemplateResult, css, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import { MdFab } from '@scopedelement/material-web/fab/MdFab.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';

import { getReference } from '@openenergytools/scl-lib';
import { newEditEventV2 } from '@omicronenergy/oscd-api/utils.js';
import OscdEditDialog from '@omicronenergy/oscd-edit-dialog/OscdEditDialog.js';
import type {
  CreateWizard,
  EditWizard,
} from '@omicronenergy/oscd-edit-dialog/OscdEditDialog.js';

import {
  newEditDialogCreateEvent,
  OscdEditDialogEvents,
} from '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog-events.js';

import { SubNetworkEditor } from './communication/SubNetworkEditor.js';
import { createElement, getChildElementsByTagName } from './foundation.js';

export default class OscdEditorCommunication extends ScopedElementsMixin(
  LitElement,
) {
  static scopedElements = {
    'md-icon': MdIcon,
    'md-fab': MdFab,
    'subnetwork-editor': SubNetworkEditor,
    'oscd-edit-dialog': OscdEditDialog,
  };

  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ type: Number })
  editCount = -1;

  @query('.action.add') add!: MdFab;

  @query('oscd-edit-dialog') editDialog?: OscdEditDialog;

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener(OscdEditDialogEvents.CREATE_EVENT, ((
      event: CustomEvent<CreateWizard>,
    ) => {
      this.editDialog?.create(event.detail).then(edits => {
        this.dispatchEvent(newEditEventV2(edits));
      });
    }) as EventListener);
    this.addEventListener(OscdEditDialogEvents.EDIT_EVENT, ((
      event: CustomEvent<EditWizard>,
    ) => {
      this.editDialog?.edit(event.detail).then(edits => {
        this.dispatchEvent(newEditEventV2(edits));
      });
    }) as EventListener);
  }

  private createCommunication(): Element {
    if (!this.doc) {
      throw new Error('Document is not defined');
    }
    const element: Element = createElement(this.doc, 'Communication', {});
    const scl = this.doc.documentElement;

    this.dispatchEvent(
      newEditEventV2({
        parent: scl,
        node: element,
        reference: getReference(scl, 'Communication'),
      }),
    );

    return element;
  }

  private async openCreateSubNetworkWizard() {
    if (!this.doc) {
      throw new Error('Document is not defined');
    }
    const parent =
      this.doc.querySelector(':root > Communication') ||
      this.createCommunication();

    this.dispatchEvent(newEditDialogCreateEvent(parent, 'SubNetwork'));
  }

  render(): TemplateResult {
    const communication = this.doc?.querySelector('Communication');

    if (!communication) {
      return html`<h1>
          <span style="color: var(--oscd-base1)"
            >Missing Communication Section</span
          ><md-fab
            class="action add"
            extended
            icon="add"
            label="Add SubNetwork"
            @click=${() => this.openCreateSubNetworkWizard()}
          ></md-fab>
        </h1>
        <oscd-edit-dialog></oscd-edit-dialog>`;
    }

    return html`<md-fab
        class="action add"
        extended
        icon="add"
        label="Add SubNetwork"
        @click=${() => this.openCreateSubNetworkWizard()}
      ></md-fab>
      <section>
        ${getChildElementsByTagName(communication, 'SubNetwork').map(
          subnetwork =>
            html`<subnetwork-editor
              .editCount=${this.editCount}
              .doc=${this.doc}
              .element=${subnetwork}
            ></subnetwork-editor>`,
        )}
      </section>
      <oscd-edit-dialog></oscd-edit-dialog> `;
  }

  static styles = css`
    * {
      --oscd-action-pane-theme-surface: var(--oscd-base3);
      --oscd-action-pane-theme-on-surface: var(--oscd-base00);
      --oscd-action-pane-theme-primary: var(--oscd-base00);
      --oscd-action-pane-theme-on-primary: var(--oscd-base2);
      --oscd-action-pane-theme-font: 'Roboto';

      --oscd-action-icon-theme-surface: var(--oscd-base0);
      --oscd-action-icon-theme-on-surface: var(--oscd-base00);
      --oscd-action-icon-theme-primary: var(--oscd-base01);
      --oscd-action-icon-theme-on-primary: var(--oscd-base2);
      --oscd-action-icon-theme-font: 'Roboto';
    }

    :host {
      width: 100vw;
    }

    h1 {
      color: var(--mdc-theme-on-surface);
      font-family: 'Roboto', sans-serif;
      font-weight: 300;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 0px;
      line-height: 48px;
      padding-left: 0.3em;
      transition: background-color 150ms linear;
    }

    section {
      display: flex;
      flex-direction: column;
      outline: none;
      padding: 8px 12px 16px;
    }

    subnetwork-editor {
      margin: 8px 12px 16px;
    }

    md-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
    }
  `;
}
