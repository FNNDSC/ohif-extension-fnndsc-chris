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
import type { SMDBcubeCore } from './SMDBcubeCore';
import {
    SMDBcubeCoreFromJSON,
    SMDBcubeCoreFromJSONTyped,
    SMDBcubeCoreToJSON,
} from './SMDBcubeCore';

/**
 * A full model that is returned from a call to the DB
 * @export
 * @interface SMDBcubeReturnModel
 */
export interface SMDBcubeReturnModel {
    /**
     * 
     * @type {boolean}
     * @memberof SMDBcubeReturnModel
     */
    status?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SMDBcubeReturnModel
     */
    cubeKeyName: string;
    /**
     * 
     * @type {SMDBcubeCore}
     * @memberof SMDBcubeReturnModel
     */
    cubeInfo: SMDBcubeCore;
}

/**
 * Check if a given object implements the SMDBcubeReturnModel interface.
 */
export function instanceOfSMDBcubeReturnModel(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "cubeKeyName" in value;
    isInstance = isInstance && "cubeInfo" in value;

    return isInstance;
}

export function SMDBcubeReturnModelFromJSON(json: any): SMDBcubeReturnModel {
    return SMDBcubeReturnModelFromJSONTyped(json, false);
}

export function SMDBcubeReturnModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): SMDBcubeReturnModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'status': !exists(json, 'status') ? undefined : json['status'],
        'cubeKeyName': json['cubeKeyName'],
        'cubeInfo': SMDBcubeCoreFromJSON(json['cubeInfo']),
    };
}

export function SMDBcubeReturnModelToJSON(value?: SMDBcubeReturnModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'status': value.status,
        'cubeKeyName': value.cubeKeyName,
        'cubeInfo': SMDBcubeCoreToJSON(value.cubeInfo),
    };
}

