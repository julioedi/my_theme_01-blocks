import { PluginDocumentSettingPanel } from "@wordpress/editor";
import { TextControl, SelectControl } from "@wordpress/components";
import { Fragment } from "@wordpress/element";
import { getEditor,getMeta } from "../data";
import {__} from "../translate";
import MultiPackageMetaControl from "../components/PackageSearch";

const ServicePackageMetaPanel = () => {
    const meta = getMeta();

    
    return (
        <PluginDocumentSettingPanel
            name="service-package-meta-field"
            title="Select Package"
            className="service-package-meta-field"
            
        >

            <MultiPackageMetaControl/>
            {/* <TextControl
                label="Starting Price"
                type="number"
                value={meta?._price ?? 0}
                onChange={(value) => editPost({ meta: { ...meta, _price: value } })}
            />
            <TextControl
                label="Maintenance Monthly"
                type="number"
                value={meta?._monthly ?? 0}
                onChange={(value) => editPost({ meta: { ...meta, _monthly: value } })}
            />
            <SelectControl
                label="Pages"
                value={meta?._pages ?? ""}
                options={[
                    { label: 'Select...', value: '' },
                    { label: 'Single', value: 'single' },
                    { label: 'Up to 10', value: 'up to 10' },
                    { label: 'More than 10', value: 'more than 10' }
                ]}
                onChange={(value) => editPost({ meta: { ...meta, _pages: value } })}
            /> */}
        </PluginDocumentSettingPanel>
    );
}

export default ServicePackageMetaPanel;