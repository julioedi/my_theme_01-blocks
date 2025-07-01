<?php
/**
 * Plugin Name: My Custom Sidebar
 * Description: Adds a custom plugin sidebar for WordPress blocks.
 * Version: 1.0
 * Author: Your Name
 * License: GPL2
 */

defined( 'ABSPATH' ) || exit;

// Hook to enqueue block editor scripts and styles
function my_custom_sidebar_enqueue() {
    wp_enqueue_script(
        'my-custom-sidebar-script',
        get_template_directory_uri( __FILE__ ) . '/blocks-dev/dist/index.js', // Your JS file for Gutenberg blocks
        array( 'wp-blocks', 'wp-edit-post', 'wp-components', 'wp-element', 'wp-i18n' ),
        filemtime( plugin_dir_path( __FILE__ ) . '/blocks-dev/dist/index.js' ),
        true
    );

    wp_enqueue_style(
        'my-custom-sidebar-style',
        get_template_directory_uri( __FILE__ ) . '/blocks-dev/dist/style.css', // Your styles
        array(),
        filemtime( __DIR__ . '/blocks-dev/dist/style.css' )
    );
}
add_action( 'enqueue_block_editor_assets', 'my_custom_sidebar_enqueue' );
