import { LitElement, TemplateResult } from 'lit';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { MdFab } from '@scopedelement/material-web/fab/MdFab.js';
import { OscdActionIcon } from '@openenergytools/oscd-action-icon';
declare const GseEditor_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export declare class GseEditor extends GseEditor_base {
    static scopedElements: {
        'md-icon': typeof MdIcon;
        'md-fab': typeof MdFab;
        'oscd-action-icon': typeof OscdActionIcon;
    };
    doc: XMLDocument;
    element: Element;
    get label(): string;
    edit: MdFab;
    delete: MdFab;
    private openEditWizard;
    private removeElement;
    render(): TemplateResult;
}
export {};
