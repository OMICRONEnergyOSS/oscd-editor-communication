import { LitElement, TemplateResult } from 'lit';
import { MdIconButton } from '@scopedelement/material-web/iconbutton/MdIconButton.js';
import { MdIcon } from '@scopedelement/material-web/icon/MdIcon.js';
import { OscdActionPane } from '@openenergytools/oscd-action-pane';
import { GseEditor } from './GseEditor.js';
import { SmvEditor } from './SmvEditor.js';
import { ConnectedAPEditor } from './ConnectedapEditor.js';
declare const SubNetworkEditor_base: typeof LitElement & import("@open-wc/scoped-elements/lit-element.js").ScopedElementsHostConstructor;
/** [[`Communication`]] subeditor for a `SubNetwork` element. */
export declare class SubNetworkEditor extends SubNetworkEditor_base {
    static scopedElements: {
        'oscd-action-pane': typeof OscdActionPane;
        'md-icon-button': typeof MdIconButton;
        'md-icon': typeof MdIcon;
        'smv-editor': typeof SmvEditor;
        'gse-editor': typeof GseEditor;
        'connectedap-editor': typeof ConnectedAPEditor;
    };
    doc: XMLDocument;
    editCount: number;
    /** SCL element SubNetwork */
    element: Element;
    /** SubNetwork attribute name */
    get name(): string;
    /** SubNetwork attribute desc */
    get desc(): string | null;
    /** SubNetwork attribute type */
    get type(): string | null;
    /** SubNetwork child elements BitRate label */
    get bitrate(): string | null;
    add: MdIconButton;
    edit: MdIconButton;
    delete: MdIconButton;
    private openCreateConnectedAPwizard;
    openEditWizard(): void;
    removeElement(): void;
    private renderSmvEditors;
    private renderGseEditors;
    private renderConnectedApEditors;
    private renderIEDs;
    private subNetworkSpecs;
    private header;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
export {};
