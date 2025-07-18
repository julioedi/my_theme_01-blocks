/**
 * @typedef {Object} PostInfo
 * @property {number} ID
 * @property {string} post_type
 * @property {string} post_title
 * @property {string} post_name
 * @property {string} post_status
 */

/**
 * @typedef {Object} CustomPostType
 * @property {PostInfo} post
 * @property {boolean} publicly_queryable
 * @property {boolean} public
 * @property {name} string
 */

/** @type {CustomPostType} */
const post_info = window.post_info;

const theme_hook = window.theme_hook;


export {theme_hook,post_info};
