import { PanelBody } from '@wordpress/components';

export default function ({title,initialOpen,children,...props}){
    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {children}
        </PanelBody>
    )
}