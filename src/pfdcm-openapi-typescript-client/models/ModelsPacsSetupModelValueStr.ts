/* tslint:disable */
/* eslint-disable */
/**
 * pfdcm
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.1.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface ModelsPacsSetupModelValueStr
 */
export interface ModelsPacsSetupModelValueStr {
    /**
     * 
     * @type {string}
     * @memberof ModelsPacsSetupModelValueStr
     */
    value?: string;
}

/**
 * Check if a given object implements the ModelsPacsSetupModelValueStr interface.
 */
export function instanceOfModelsPacsSetupModelValueStr(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ModelsPacsSetupModelValueStrFromJSON(json: any): ModelsPacsSetupModelValueStr {
    return ModelsPacsSetupModelValueStrFromJSONTyped(json, false);
}

export function ModelsPacsSetupModelValueStrFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelsPacsSetupModelValueStr {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'value': !exists(json, 'value') ? undefined : json['value'],
    };
}

export function ModelsPacsSetupModelValueStrToJSON(value?: ModelsPacsSetupModelValueStr | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'value': value.value,
    };
}

