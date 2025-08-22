import { LitElement, TemplateResult, html, svg } from 'lit';
import { property, query, state } from 'lit/decorators.js';
import { ScopedElementsMixin } from '@open-wc/scoped-elements/lit-element.js';

import { newEditEventV2 } from '@omicronenergy/oscd-api/utils.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { MdFab } from '@scopedelement/material-web/fab/MdFab.js';
import { OscdActionIcon } from '@openenergytools/oscd-action-icon';

import { newEditDialogEditEvent } from '@omicronenergy/oscd-edit-dialog/oscd-edit-dialog-events.js';

const sizableGooseIcon = svg`<svg viewBox="0 0 24 24">
<path fill="currentColor" d="M11,7H15V9H11V15H13V11H15V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />
</svg>`;

export class GseEditor extends ScopedElementsMixin(LitElement) {
  static scopedElements = {
    'md-icon': MdIcon,
    'md-fab': MdFab,
    'oscd-action-icon': OscdActionIcon,
  };

  @property({ attribute: false })
  doc!: XMLDocument;

  @property({ attribute: false })
  element!: Element;

  @state()
  get label(): string {
    return `${this.element.getAttribute('ldInst')}/${this.element.getAttribute(
      'cbName',
    )}`;
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
    return html`<oscd-action-icon
      label="${this.label}"
      .icon="${sizableGooseIcon}"
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
    </oscd-action-icon>`;
  }
}
