import { LitElement, TemplateResult } from 'lit';
import { MdFab } from '@scopedelement/material-web/fab/MdFab.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import OscdEditDialog from '@omicronenergy/oscd-edit-dialog/OscdEditDialog.js';
import { SubnetworkEditor } from './communication/SubnetworkEditor.js';
declare const OscdEditorCommunication_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export default class OscdEditorCommunication extends OscdEditorCommunication_base {
    static scopedElements: {
        'md-icon': typeof MdIcon;
        'md-fab': typeof MdFab;
        'subnetwork-editor': typeof SubnetworkEditor;
        'oscd-edit-dialog': typeof OscdEditDialog;
    };
    doc: XMLDocument;
    editCount: number;
    add: MdFab;
    editDialog?: OscdEditDialog;
    connectedCallback(): void;
    private createCommunication;
    private openCreateSubNetworkWizard;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
export {};
