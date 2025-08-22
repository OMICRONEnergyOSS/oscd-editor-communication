import { LitElement, TemplateResult } from 'lit';
import { MdFab } from '@scopedelement/material-web/fab/MdFab.js';
import { OscdActionIcon } from '@openenergytools/oscd-action-icon';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
declare const ConnectedAPEditor_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
/** [[`Communication`]] subeditor for a `ConnectedAP` element. */
export declare class ConnectedAPEditor extends ConnectedAPEditor_base {
    static scopedElements: {
        'md-fab': typeof MdFab;
        'md-icon': typeof MdIcon;
        'oscd-action-icon': typeof OscdActionIcon;
    };
    /** SCL element ConnectedAP */
    element: Element;
    /** ConnectedAP attribute apName */
    get label(): string;
    edit: MdFab;
    delete: MdFab;
    private openEditWizard;
    private removeElement;
    render(): TemplateResult;
}
export {};
