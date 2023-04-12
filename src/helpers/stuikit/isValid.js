/**
 * @param {object} model - валидируемая модель
 * @param {object} schema - схема валидации (см. https://github.com/flatiron/revalidator)
 * @param {object} CONFORM_DATA - дополнительные данные которые нужно пробросить в conform или error
(т.к. оттуда не добраться до редакса)
 */
export default function isValid(model = {}, schema = {}, CONFORM_DATA = {}) {
    const FORMATS = {
        'email'      : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/,
        'ip-address' : /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/i,
        'ipv6'       : /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/,
        'date-time'  : /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:.\d{1,3})?Z$/,
        'date'       : /^\d{4}-\d{2}-\d{2}$/,
        'time'       : /^\d{2}:\d{2}:\d{2}$/,
        'color'      : /^#[a-z0-9]{6}|#[a-z0-9]{3}|(?:rgb\(\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*,\s*(?:[+-]?\d+%?)\s*\))aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow$/i,
        // eslint-disable-next-line
        'host-name': /^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])/,
    };

    const SCHEMA = {};
    for (const schem in schema) {
        if (model[schem] !== undefined || schema[schem].without_model)
            SCHEMA[schem] = schema[schem];
    }

    let IF_VALID_GLOB = true;
    const ERROR_GLOB_MSG = {};

    for (const SCHEMA_NAME in SCHEMA) {
        if (SCHEMA.hasOwnProperty(SCHEMA_NAME)) {
            const SCHEM = SCHEMA[SCHEMA_NAME];
			let CHECK_VALUE = model[SCHEMA_NAME]; // если нужно отвалидировать число 0, то я получу undefined - а это неверно

			if (typeof(CHECK_VALUE) === 'string')
				CHECK_VALUE = CHECK_VALUE.trim();

            if (!SCHEM.message && !SCHEM.messages) {
                console.error('not found message or messages on ' + SCHEMA_NAME, SCHEM);
                continue;
            }

            for (const ITEM_SCHEM in SCHEM) {
                if (SCHEM.hasOwnProperty(ITEM_SCHEM)) {
                    if (ITEM_SCHEM === 'message' || ITEM_SCHEM === 'messages')
                        continue;

                    let IF_ERROR = false;
                    let MESSAGE = (SCHEM.messages && SCHEM.messages[ITEM_SCHEM]) ? SCHEM.messages[ITEM_SCHEM] : SCHEM.message;
                    const ITEM_SCHEM_VALUE = SCHEM[ITEM_SCHEM];

                    switch (ITEM_SCHEM) {
                        case 'type':
                            //  http://javascript.ru/typeof
                            if (CHECK_VALUE && typeof (CHECK_VALUE) !== ITEM_SCHEM_VALUE)
                                IF_ERROR = true;

                            break;
                        case 'required':
                            if (ITEM_SCHEM_VALUE === true && [undefined, null, ''].includes(CHECK_VALUE))
                                IF_ERROR = true;

                            break;
                        case 'pattern':
                            if (CHECK_VALUE && !ITEM_SCHEM_VALUE.test(CHECK_VALUE))
                                IF_ERROR = true;

                            break;
                        case 'minItems':
                            if (typeof (CHECK_VALUE) !== 'object' || CHECK_VALUE.length < ITEM_SCHEM_VALUE)
                                IF_ERROR = true;

                            break;
                        case 'maxItems':
                            if (typeof (CHECK_VALUE) !== 'object' || CHECK_VALUE.length > ITEM_SCHEM_VALUE)
                                IF_ERROR = true;

                            break;
                        case 'enum':
                            if (!ITEM_SCHEM_VALUE.indexOf(CHECK_VALUE) + 1)
                                IF_ERROR = true;

                            break;
                        case 'minLength':
                            if (CHECK_VALUE.length < ITEM_SCHEM_VALUE)
                                IF_ERROR = true;

                            break;
                        case 'maxLength':
                            if (CHECK_VALUE.length > ITEM_SCHEM_VALUE)
                                IF_ERROR = true;

                            break;
                        case 'format':
                            if (!FORMATS[ITEM_SCHEM_VALUE])
                                console.error('Not found format - ' + ITEM_SCHEM_VALUE);

                            if (FORMATS[ITEM_SCHEM_VALUE] && !FORMATS[ITEM_SCHEM_VALUE].test(CHECK_VALUE))
                                IF_ERROR = true;

                            break;
                        case 'conform':
                        case 'error':
                            if (typeof (ITEM_SCHEM_VALUE) === 'function') {
                                let result = {};

                                if (SCHEM.without_model) {
                                    result = ITEM_SCHEM_VALUE(model, SCHEMA_NAME, CONFORM_DATA);
                                } else {
                                    result = ITEM_SCHEM_VALUE(CHECK_VALUE, model, SCHEMA_NAME, CONFORM_DATA);
                                }

                                if (result !== undefined && result !== null && result !== false) {
                                    IF_ERROR = true;

                                    if (typeof (result) === 'string')
                                        MESSAGE = result;
                                }
                            }
                            break;
                        default:
                            break;
                    }

                    if (!ERROR_GLOB_MSG[SCHEMA_NAME])
                        ERROR_GLOB_MSG[SCHEMA_NAME] = null;

                    if (IF_ERROR)
                        ERROR_GLOB_MSG[SCHEMA_NAME] = MESSAGE;

                    if (IF_VALID_GLOB && IF_ERROR)
                        IF_VALID_GLOB = false;
                }
            }
        }
    }
    return {
        valid : IF_VALID_GLOB,
        state : ERROR_GLOB_MSG
    };
}


export const getFirstErrorField = (errorsState) => {

    for (const el in errorsState) {
        if (!!errorsState[el])
            return el;
    }

    return null
}

export const getFirstErrorText = (errorsState) => {

    for (const el in errorsState) {
        if (!!errorsState[el])
            return errorsState[el];
    }

    return null
}
