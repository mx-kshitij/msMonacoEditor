import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { MSMonacoEditorPreviewProps } from "../typings/MSMonacoEditorProps";

declare function require(name: string): string;

export class preview extends Component<MSMonacoEditorPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/MSMonacoEditor.css");
}
