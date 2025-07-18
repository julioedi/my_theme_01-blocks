import { store as editorStore } from '@wordpress/editor';
import { MediaUpload } from '@wordpress/block-editor';
import { useEffect, useState, useRef } from '@wordpress/element';
import { Spinner } from "@wordpress/components"
import { __ } from "./__";


const getAttribute = (string) => {
    return window.wp.data.useSelect((select) =>
        select(editorStore)?.getEditedPostAttribute(string)
    );
}

const theTitle = () => {
    return window.wp.data.useSelect((select) =>
        select(editorStore)?.getEditedPostAttribute('title')
    );
}


const getMeta = () => {
    return window.wp.data.useSelect((select) =>
        select('core/editor').getEditedPostAttribute('meta') ?? {}
    );
}

const getEditor = () => {
    return window.wp.data.useDispatch('core/editor');
}


const SeoImage = ({ code, onSelect, onDelete, ...props }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [hasTriedLoading, setHasTriedLoading] = useState(false);

    const media = window.wp.data.useSelect((select) => {
        return code ? select('core').getEntityRecord('postType', 'attachment', code) : null;
    }, [code]);

    useEffect(() => {
        if (code) {
            setIsLoading(true);
            setHasTriedLoading(false);
        }
    }, [code]);

    useEffect(() => {
        if (code && !hasTriedLoading) {
            setHasTriedLoading(true);
            const timeout = setTimeout(() => {
                setIsLoading(false); // Stop loading even if media is null
            }, 1000); // Allow time for media to load (adjust as needed)
            return () => clearTimeout(timeout);
        } else if (media) {
            setIsLoading(false);
        }
    }, [media, code, hasTriedLoading]);

    const Visible = () => (
        <div className='featured_preview filled'>
            <img
                src={media.source_url}
                alt={media.alt_text || 'Featured'}
            />
            <div className='actions'>
                <div className='img_btn'>{__("Replace")}</div>
                <div
                    className='img_btn'
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (onDelete) onDelete(code);
                    }}
                >
                    {__("Remove")}
                </div>
            </div>
        </div>
    );

    const Empty = () => (
        <div className='featured_preview'>
            {__("Select image")}
        </div>
    );

    const Loader = () => (
        <div className='featured_preview'>
            <Spinner />
        </div>
    );

    return (
        <div style={{ marginBottom: 12 }}>
            <MediaUpload
                onSelect={(e) => {
                    setIsLoading(true);
                    setHasTriedLoading(false);
                    if (onSelect) {
                        onSelect(e)
                    };
                }}
                allowedTypes={['image']}
                value={code}
                render={({ open }) => (
                    <div onClick={open} style={{ cursor: 'pointer' }}>
                        {isLoading ? <Loader /> : media ? <Visible /> : <Empty />}
                    </div>
                )}
            />
        </div>
    );
};


const CssEditor = ({ customCSS, onChange }) => {
    const [css, setCss] = useState(customCSS || '');
    const editorRef = useRef(null);

    useEffect(() => {
        // Make sure wp.codeEditor is available
        if (window.wp && window.wp.codeEditor && editorRef.current) {
            const editor = wp.codeEditor.create(editorRef.current, {
                mode: 'css', // Set editor mode to CSS for syntax highlighting
                lineNumbers: true, // Show line numbers
                theme: 'default', // You can change this to another theme
                value: css, // Initial CSS content
                lineWrapping: true, // Wrap long lines
                viewportMargin: Infinity, // Make sure the editor doesn't scroll unnecessarily
            });

            // On change, update the CSS state and block attributes
            editor.on('change', (instance) => {
                const newCss = instance.getValue();
                setCss(newCss); // Set state
                if (onChange) {
                    onChange(newCss)
                }
            });
        }
    }, [css]);

    return (
        <div id='post_css_inline'>
            <div ref={editorRef} style={{ height: '100%', width: '100%' }}></div>
            <div className="block-content">
                <p>This block allows you to enter custom CSS code.</p>
            </div>
        </div>
    );
};



export {
    theTitle,
    getMeta,
    getEditor,
    SeoImage,
    CssEditor,
};