import { PanelBody, TextControl, TextareaControl, SelectControl } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { getMeta, getEditor, SeoImage } from "./data";
import { RichText } from '@wordpress/block-editor';
import { __ } from "./__";


//summary|summary_large_image|app|player|gallery (up to 4 images)
const twitterOptions = [
    {
        label: "Select",
        value: "",
        hidden: true,
    },
    {
        label: "Large Image",
        value: "summary_large_image"
    },
    {
        label: "Regular card",
        value: "summary"
    },
    {
        label: "App",
        value: "app"
    },
    {
        label: "Player",
        value: "player"
    },
    //outdated
    // {
    //     label: "Gallery (up tp 4 images)",
    //     value: "gallery",
    // }
]

const defaultSeo = {
    title: "",
    keys: "",
    description: "",
    social_featured_image: null,
    twitter_type: "summary_large_image", //summary|summary_large_image|app|player|gallery (up to 4 images)
    twitter_title: "",
    twitter_description: "",
    twitter_image: [
        null,
        null,
        null,
        null
    ],
}

export default function () {
    const meta = getMeta();
    if (typeof meta?.__seo != "object") {
        meta.__seo = defaultSeo
    }
    else {
        meta.__seo = {
            ...defaultSeo,
            ...meta.__seo
        }
    }
    const [twitter, updateTwitter] = useState(meta?.__seo?.twitter_type ?? "summary_large_image");

    const seo = meta?.__seo || defaultSeo;
    const { editPost } = getEditor();
    const updateField = (field, value) => {
        const updatedSeo = { ...seo, [field]: value };
        editPost({ meta: { ...meta, __seo: updatedSeo } });
    };
    const twitterImages = seo.twitter_image;
    let first = {
        index: 0
    };
    twitterImages.forEach((item, index) => {
        if (item && index != first.index) {
            first.index = index;
        }
    })

    first = !first ? 0 : first;
    return (
        <>
            <PanelBody title={__("General information")} initialOpen={true}>
                <SeoImage
                    code={seo.social_featured_image} onSelect={(e) => {
                        updateField('social_featured_image', e.id);
                    }}
                    onDelete={() => {
                        updateField('social_featured_image', null);
                    }}
                />
                <TextControl
                    label={__("Alternative Title")}
                    value={seo.title || ''}
                    onChange={(value) => updateField('title', value)}
                    help={__("By default will use Post title")}
                />
                <TextControl
                    label={__("Search Keys")}
                    value={seo.keys || ''}
                    onChange={(value) => updateField('keys', value)}
                    help={__("Separate each one by a  \",\"")}
                />
                <TextareaControl
                    label={__("Short description")}
                    value={seo.description || ''}
                    onChange={(value) => updateField('description', value)}
                    help={__("Description to show in search engines, leave empty to use post exceprt")}
                />
            </PanelBody>
            <PanelBody title={__("Twitter (X)")} initialOpen={false}>
                <TextControl
                    label={__("Description")}
                    value={seo.title || ''}
                    onChange={(value) => updateField('twitter_description', value)}
                    help={__("Leave empty yo use default data")}
                />
                <div style={{ paddingBottom: 24 }} />
                <SelectControl
                    label={__("Card Type")}
                    value={seo.twitter_type || ''}
                    onChange={(value) => {
                        updateField('twitter_type', value);
                        updateTwitter(value);
                    }}
                    help={__("Type of post preview on X")}
                >
                    {
                        twitterOptions.map((item, index) => (
                            <option
                                value={item.value}
                                hidden={item.hidden ? true : false}
                                selected={twitter == item.value}
                                key={index}
                            >
                                {__(item.label)}
                            </option>
                        ))
                    }
                </SelectControl>
                <div className="twitter_gallery">
                    {
                        twitterImages.map((item, i) => {
                            if (twitter !== "gallery" && i != first.index) {
                                return null;
                            }
                            return (
                                <SeoImage
                                    code={item} onSelect={(e) => {
                                        const updatedImg = [...twitterImages];
                                        updatedImg[i] = e.id;
                                        updateField('twitter_image', updatedImg);
                                    }}
                                    onDelete={() => {
                                        const updatedImg = [...twitterImages];
                                        updatedImg[i] = null;
                                        updateField('twitter_image', updatedImg);
                                    }}
                                />
                            )
                        })
                    }
                </div>
                <i>{__("By Default will use the post featured image, if dont exists, will try theme default featured imagee")}</i>

            </PanelBody>
        </>
    )
}