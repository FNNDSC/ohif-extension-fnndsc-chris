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
import type { ModelsSmdbSetupModelValueStr } from './ModelsSmdbSetupModelValueStr';
import {
    ModelsSmdbSetupModelValueStrFromJSON,
    ModelsSmdbSetupModelValueStrFromJSONTyped,
    ModelsSmdbSetupModelValueStrToJSON,
} from './ModelsSmdbSetupModelValueStr';
import type { SMDBFsCore } from './SMDBFsCore';
import {
    SMDBFsCoreFromJSON,
    SMDBFsCoreFromJSONTyped,
    SMDBFsCoreToJSON,
} from './SMDBFsCore';

/**
 * The SMDB FS key config model
 * @export
 * @interface SMDBFsConfig
 */
export interface SMDBFsConfig {
    /**
     * 
     * @type {ModelsSmdbSetupModelValueStr}
     * @memberof SMDBFsConfig
     */
    fsKeyName: ModelsSmdbSetupModelValueStr;
    /**
     * 
     * @type {SMDBFsCore}
     * @memberof SMDBFsConfig
     */
    fsInfo: SMDBFsCore;
}

/**
 * Check if a given object implements the SMDBFsConfig interface.
 */
export function instanceOfSMDBFsConfig(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "fsKeyName" in value;
    isInstance = isInstance && "fsInfo" in value;

    return isInstance;
}

export function SMDBFsConfigFromJSON(json: any): SMDBFsConfig {
    return SMDBFsConfigFromJSONTyped(json, false);
}

export function SMDBFsConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): SMDBFsConfig {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'fsKeyName': ModelsSmdbSetupModelValueStrFromJSON(json['fsKeyName']),
        'fsInfo': SMDBFsCoreFromJSON(json['fsInfo']),
    };
}

export function SMDBFsConfigToJSON(value?: SMDBFsConfig | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'fsKeyName': ModelsSmdbSetupModelValueStrToJSON(value.fsKeyName),
        'fsInfo': SMDBFsCoreToJSON(value.fsInfo),
    };
}

