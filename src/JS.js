import { PanelBody } from "@wordpress/components";
import { __ } from "./__";
import { useEffect, useRef, useState } from '@wordpress/element';
import { getMeta } from "./data";


export default function () {
    const meta = getMeta()
    const [js, setJS] = useState(meta?.__js);
    const editorRef = useRef(null);

   useEffect(() => {
    if (window.wp && window.wp.codeEditor && editorRef.current) {
        const dispatch = window.wp.data.dispatch('core/editor');

        const editor = wp.codeEditor.initialize(editorRef.current, {
            codemirror: {
                mode: 'javascript',
                lineNumbers: true,
                theme: 'default',
                lineWrapping: true,
                viewportMargin: Infinity,
                autoCloseBrackets: true,
            },
        });

        editor.codemirror.setValue(js || "");

        editor.codemirror.on('change', (cm) => {
            const updatedJS = cm.getValue();
            setJS(updatedJS);
            dispatch.editPost({ meta: { __js: updatedJS.trim() } });
        });
    }
}, []);
    return (
        <PanelBody className="inline_codemirror_pannel">
            <textarea ref={editorRef}></textarea>
            <div className="block-content">
                <p>{__("This block allows you to enter custom JS code.")}</p>
            </div>
        </PanelBody>
    );
}