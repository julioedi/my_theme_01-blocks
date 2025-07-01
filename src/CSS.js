import { PanelBody } from "@wordpress/components";
import { __ } from "./__";
import { useEffect, useRef, useState } from '@wordpress/element';
import { getMeta } from "./data";


export default function () {
    const meta = getMeta()
    const [css, setCss] = useState(meta?.__css);
    const editorRef = useRef(null);

   useEffect(() => {
    if (window.wp && window.wp.codeEditor && editorRef.current) {
        const dispatch = window.wp.data.dispatch('core/editor');

        const editor = wp.codeEditor.initialize(editorRef.current, {
            codemirror: {
                mode: 'css',
                lineNumbers: true,
                theme: 'default',
                lineWrapping: true,
                viewportMargin: Infinity,
                autoCloseBrackets: true,
            },
        });

        editor.codemirror.setValue(css || "");

        editor.codemirror.on('change', (cm) => {
            const updatedCss = cm.getValue();
            setCss(updatedCss);
            dispatch.editPost({ meta: { __css: updatedCss.trim() } });
        });
    }
}, []);
    return (
        <PanelBody className="inline_codemirror_pannel">
            <textarea ref={editorRef}></textarea>
            <div className="block-content">
                <p>{__("This block allows you to enter custom CSS code.")}</p>
            </div>
        </PanelBody>
    );
}