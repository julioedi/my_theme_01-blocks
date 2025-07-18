import domReady from '@wordpress/dom-ready';
import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/editor';
import { useState } from '@wordpress/element';
import { __ } from "./__";
import SEO from './SEO';
import CSS from './CSS';
import JS from "./JS";
import { Component } from '@wordpress/element';
import { post_info, theme_hook } from './prefix';
import HomeSlides from './components/HomeSlides';
import { registerBlockType } from '@wordpress/blocks';
import PackageMetaPanel from './metabox/Packages';
import ServicePackageMetaPanel from './metabox/ServicePackage';




const icon = "admin-generic";
const id = "theme-post-style";

const is_public = post_info && !post_info?.publicly_queryable && !post_info?.public ? false : true;

console.log({is_public,post_info});
const seoType = {
    name: 'seo',
    title: 'SEO',
    className: 'tab-seo',
    Component: SEO,
}
const cssType = {
    name: 'css',
    title: 'CSS',
    className: 'tab-css',
    Component: CSS,
}

const jsType = {
    name: 'js',
    title: 'JS',
    className: 'tab-js',
    Component: JS,
}
const tabsData = is_public ? [seoType, cssType, jsType] : [cssType, jsType];


registerBlockType('easycv/home-slides', HomeSlides);
domReady(() => {

    const Head = ({ active, setActive }) => {
        return (
            <div role='tablist' id="custom_theme_post_tabs" aria-orientation="horizontal" data-select-on-move="false">
                <div className='active_bar' data-index={active[1]} />
                {
                    tabsData.map((item, index) => (
                        <div
                            key={index}
                            className={item.name == active[0] ? "item active" : "item"}
                            onClick={() => {
                                setActive([item.name, index])
                            }}
                        >
                            {__(item.title)}
                        </div>
                    )
                    )
                }
            </div>
        )
    }
    const render = () => {
        const [active, setActive] = useState(['seo', 0]);
        const Item = tabsData[active[1]].Component;
        return (
            <PluginSidebar
                name={id}
                title={"Post Settings"}
                icon={icon}
                score="edit-post"
                header={<Head active={active} setActive={setActive} />}
            >
                <div id="post_content_settings">
                    <Item />
                </div>
            </PluginSidebar>
        );
    };
    registerPlugin(id, {
        render,
        icon,
    });

    if (post_info && post_info.name === "packages") {
        registerPlugin("theme-package-meta", {
            render: PackageMetaPanel,
            icon
        });
    }
    
    if (post_info && post_info.name === "services") {
        registerPlugin("theme-services-meta", {
            render: ServicePackageMetaPanel,
            icon
        });
    }

});
