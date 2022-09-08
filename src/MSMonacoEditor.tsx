import { createElement, useEffect, useRef } from "react";
import * as monaco from "monaco-editor";

import { MSMonacoEditorContainerProps } from "../typings/MSMonacoEditorProps";

import "./ui/MSMonacoEditor.css";

// @ts-ignore
self.MonacoEnvironment = {
    getWorkerUrl: function (_moduleId: any, label: string) {
        if (label === 'json') {
            return './json.worker.bundle.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return './css.worker.bundle.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './html.worker.bundle.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './ts.worker.bundle.js';
        }
        return './editor.worker.bundle.js';
    }
};

export function MSMonacoEditor({ name }: MSMonacoEditorContainerProps) {


    const outerContainer = useRef<HTMLDivElement>(null);
    let editor: monaco.editor.IStandaloneCodeEditor;

    useEffect(() => {
        // const outerContainer = document.getElementById(name);
        if(!outerContainer.current) return;

        editor = monaco.editor.create(outerContainer.current, {
            value: "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
            language: 'javascript',

            lineNumbers: 'off',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            theme: 'vs-dark'
        });
        setTimeout(function () {
            editor.updateOptions({
                lineNumbers: 'on'
            });
        }, 2000);

        editor.getModel()?.onDidChangeContent((_e) => {
            console.log(editor.getModel()?.getValue())
        })
    }, [])

    return (
        <div id={name} className="monacoEditorOuter" ref={outerContainer}></div>
    )
}