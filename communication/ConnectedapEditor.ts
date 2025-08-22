import { LitElement, TemplateResult, html } from 'lit';
import { property, query, state } from 'lit/decorators.js';

import { MdFab } from '@scopedelement/material-web/fab/MdFab.js';

import { OscdActionIcon } from '@openenergytools/oscd-action-icon';

import { newEditEventV2 } from '@omicronenergy/oscd-api/utils.js';
import { newEditDialogEditEvent } from '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog-events.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';

/** [[`Communication`]] subeditor for a `ConnectedAP` element. */
export class ConnectedAPEditor extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'md-fab': MdFab,
    'md-icon': MdIcon,
    'oscd-action-icon': OscdActionIcon,
  };
  /** SCL element ConnectedAP */
  @property({ attribute: false })
  element!: Element;

  /** ConnectedAP attribute apName */
  @state()
  get label(): string {
    return this.element.getAttribute('apName')!;
  }

  @query('.action.edit') edit!: MdFab;

  @query('.action.delete') delete!: MdFab;

  private openEditWizard(): void {
    this.dispatchEvent(newEditDialogEditEvent(this.element));
  }

  private removeElement(): void {
    if (this.element) {
      this.dispatchEvent(newEditEventV2({ node: this.element }));
    }
  }

  render(): TemplateResult {
    return html` <oscd-action-icon
      label="${this.label}"
      icon="settings_input_hdmi"
      ><md-fab slot="action" mini style="opacity:0;"></md-fab>
      <md-fab slot="action" mini style="opacity:0;"></md-fab>
      <md-fab
        class="action edit"
        slot="action"
        mini
        @click="${() => this.openEditWizard()}"
        ><md-icon slot="icon">edit</md-icon></md-fab
      >
      <md-fab
        class="action delete"
        slot="action"
        mini
        @click="${() => this.removeElement()}"
        ><md-icon slot="icon">delete</md-icon></md-fab
      >
      ></oscd-action-icon
    >`;
  }
}
