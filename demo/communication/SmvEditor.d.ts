import { LitElement, TemplateResult } from 'lit';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { MdFab } from '@scopedelement/material-web/fab/MdFab.js';
import { OscdActionIcon } from '@openenergytools/oscd-action-icon';
export declare const sizableSmvIcon: TemplateResult<2>;
declare const SmvEditor_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
export declare class SmvEditor extends SmvEditor_base {
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
