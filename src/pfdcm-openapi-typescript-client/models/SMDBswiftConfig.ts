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
import type { SMDBswiftCore } from './SMDBswiftCore';
import {
    SMDBswiftCoreFromJSON,
    SMDBswiftCoreFromJSONTyped,
    SMDBswiftCoreToJSON,
} from './SMDBswiftCore';

/**
 * The SMDB swift key config model
 * @export
 * @interface SMDBswiftConfig
 */
export interface SMDBswiftConfig {
    /**
     * 
     * @type {ModelsSmdbSetupModelValueStr}
     * @memberof SMDBswiftConfig
     */
    swiftKeyName: ModelsSmdbSetupModelValueStr;
    /**
     * 
     * @type {SMDBswiftCore}
     * @memberof SMDBswiftConfig
     */
    swiftInfo: SMDBswiftCore;
}

/**
 * Check if a given object implements the SMDBswiftConfig interface.
 */
export function instanceOfSMDBswiftConfig(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "swiftKeyName" in value;
    isInstance = isInstance && "swiftInfo" in value;

    return isInstance;
}

export function SMDBswiftConfigFromJSON(json: any): SMDBswiftConfig {
    return SMDBswiftConfigFromJSONTyped(json, false);
}

export function SMDBswiftConfigFromJSONTyped(json: any, ignoreDiscriminator: boolean): SMDBswiftConfig {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'swiftKeyName': ModelsSmdbSetupModelValueStrFromJSON(json['swiftKeyName']),
        'swiftInfo': SMDBswiftCoreFromJSON(json['swiftInfo']),
    };
}

export function SMDBswiftConfigToJSON(value?: SMDBswiftConfig | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'swiftKeyName': ModelsSmdbSetupModelValueStrToJSON(value.swiftKeyName),
        'swiftInfo': SMDBswiftCoreToJSON(value.swiftInfo),
    };
}

