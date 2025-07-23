import { registerBlockType } from '@wordpress/blocks';
import {
    useBlockProps,
    InnerBlocks,
    InspectorControls,
    MediaUpload,
    MediaUploadCheck
} from '@wordpress/block-editor';
import {
    PanelBody,
    Button
} from '@wordpress/components';
import { __ } from '../translate';
import { useSelect } from '@wordpress/data';


const edit = ({ attributes, setAttributes }) => {
    const { img } = attributes;

    // Obtener datos de la imagen seleccionada
    const image = useSelect((select) =>
        img ? select('core').getMedia(img) : null,
        [img]
    );

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Hero Banner Settings')} initialOpen={true}>
                    <MediaUploadCheck>
                        <MediaUpload
                            onSelect={(media) => setAttributes({ img: media.id })}
                            allowedTypes={['image']}
                            value={img}
                            render={({ open }) => (
                                <Button onClick={open} isSecondary variant="secondary">
                                    {img ? __('Cambiar imagen') : __('Seleccionar imagen')}
                                </Button>
                            )}
                        />
                    </MediaUploadCheck>
                    {image && (
                        <div style={{ marginTop: '10px' }}>
                            <img
                                src={image.source_url}
                                alt={image.alt_text || ''}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                    )}
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <p><strong>{__('Contenido del Hero Banner')}</strong></p>
                <InnerBlocks />
            </div>
        </>
    );
}

const save = ({ attributes }) => {
    const { img } = attributes;

    return (
        <div {...useBlockProps.save()}>
            <div dangerouslySetInnerHTML={{ __html: `[theme_hero_banner img="${img}"]` }} />
            <InnerBlocks.Content />
            <div dangerouslySetInnerHTML={{ __html: `[/theme_hero_banner]` }} />
        </div>
    );
}

const heroBannerProps = {
    title: __('Hero Banner'),
    icon: 'format-image',
    category: 'layout',
    attributes: {
        img: {
            type: 'number',
            default: null
        }
    },
    keywords: [
        __("Hero"),
        __("Banner"),
        __("Cover")
	],
    edit,
    save,
}

export default heroBannerProps;
