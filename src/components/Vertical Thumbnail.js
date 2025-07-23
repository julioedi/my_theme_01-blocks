import { PluginDocumentSettingPanel } from '@wordpress/editor';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import {__} from "../translate";

const ThumbVerticalPanel = () => {
    const meta = useSelect((select) =>
        select('core/editor').getEditedPostAttribute('meta')
    );
    

    const { editPost } = useDispatch('core/editor');

    const imageId = meta?._thumb_vertical;

    // Obtener detalles del attachment a partir del ID
    const media = useSelect(
        (select) =>
            imageId
                ? select('core').getEntityRecord('postType', 'attachment', imageId)
                : null,
        [imageId]
    );

    const imageUrl = media?.source_url;

    const setThumb = (media) => {
        editPost({
            meta: {
                _thumb_vertical: media.id,
            },
        });
    };

    const removeThumb = () => {
        editPost({
            meta: {
                _thumb_vertical: null,
            },
        });
    };

    return (
        <PluginDocumentSettingPanel
            name="thumb-vertical-panel"
            title={__("Thumbnail Vertical")}
            className="thumb-vertical-panel"
        >
            <MediaUploadCheck>
                <MediaUpload
                    onSelect={setThumb}
                    allowedTypes={['image']}
                    value={imageId}
                    render={({ open }) => (
                        <div>
                            {imageUrl ? (
                                <div style={{ marginBottom: '10px' }}>
                                    <img
                                        src={imageUrl}
                                        alt="Vertical Thumbnail"
                                        style={{ maxWidth: '100%' }}
                                    />
                                    <Button
                                        isSecondary
                                        isDestructive
                                        onClick={removeThumb}
                                        style={{ marginTop: '8px' }}
                                    >
                                        Remove Thumbnail
                                    </Button>
                                </div>
                            ) : (
                                <p>No vertical thumbnail selected.</p>
                            )}
                            <Button onClick={open} isPrimary>
                                {imageId ? 'Replace Thumbnail' : 'Set Vertical Thumbnail'}
                            </Button>
                        </div>
                    )}
                />
            </MediaUploadCheck>
        </PluginDocumentSettingPanel>
    );
};

export default ThumbVerticalPanel;