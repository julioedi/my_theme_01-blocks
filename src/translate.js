import { __ as Translate } from "@wordpress/i18n";
import hook from "./hook";

const __ = (str) =>{
    return Translate(str, hook)
}

export {__}