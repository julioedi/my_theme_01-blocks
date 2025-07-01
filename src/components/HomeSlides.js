import { useBlockProps, InspectorControls, InnerBlocks, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, Button, ColorPalette } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const COLORS = [
    { name: 'Blanco', color: '#ffffff' },
    { name: 'Gris claro', color: '#f9f9f9' },
    { name: 'Azul claro', color: '#cce5ff' },
    { name: 'Verde claro', color: '#d4edda' },
    { name: 'Rosa claro', color: '#f8d7da' }
];

export default {
    title: "Home slide",
    icon: 'feedback',
    category: 'layout',
    attributes: {
        backgroundColor: {
            type: 'string',
            default: '#ffffff',
        },
        backgroundImage: {
            type: 'string',
            default: '',
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { backgroundColor, backgroundImage } = attributes;

        const style = {
            backgroundColor: backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };

        const blockProps = useBlockProps({ style });

        // Use event handlers to update state directly
        const handleColorChange = (color) => {
            if (color !== backgroundColor) {
                setAttributes({ backgroundColor: color });
            }
        };

        const handleImageSelect = (media) => {
            if (media.url !== backgroundImage) {
                setAttributes({ backgroundImage: media.url });
            }
        };

        const handleRemoveImage = () => {
            setAttributes({ backgroundImage: '' });
        };

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Ajustes de Fondo')}>
                        <p>{__('Color de fondo')}</p>
                        <ColorPalette
                            colors={COLORS}
                            value={backgroundColor}
                            onChange={handleColorChange}
                        />
                        <p>{__('Imagen de fondo')}</p>
                        <MediaUploadCheck>
                            <MediaUpload
                                onSelect={handleImageSelect}
                                allowedTypes={['image']}
                                render={({ open }) => (
                                    <Button onClick={open} isSecondary>
                                        {backgroundImage ? __('Cambiar imagen') : __('Seleccionar imagen')}
                                    </Button>
                                )}
                            />
                        </MediaUploadCheck>
                        {backgroundImage && (
                            <Button
                                onClick={handleRemoveImage}
                                isLink
                                isDestructive
                            >
                                {__('Quitar imagen')}
                            </Button>
                        )}
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks />
                </div>
            </>
        );
    },

    save: ({ attributes }) => {
        const { backgroundColor, backgroundImage } = attributes;

        const style = {
            backgroundColor: backgroundColor,
            backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        };

        const blockProps = useBlockProps.save({ style });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        );
    }
};
