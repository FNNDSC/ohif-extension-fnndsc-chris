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
import type { ModelsPacsSetupModelValueStr } from './ModelsPacsSetupModelValueStr';
import {
    ModelsPacsSetupModelValueStrFromJSON,
    ModelsPacsSetupModelValueStrFromJSONTyped,
    ModelsPacsSetupModelValueStrToJSON,
} from './ModelsPacsSetupModelValueStr';

/**
 * 
 * @export
 * @interface BodyPACSobjPortUpdateApiV1PACSservicePortPost
 */
export interface BodyPACSobjPortUpdateApiV1PACSservicePortPost {
    /**
     * 
     * @type {ModelsPacsSetupModelValueStr}
     * @memberof BodyPACSobjPortUpdateApiV1PACSservicePortPost
     */
    objToUpdate: ModelsPacsSetupModelValueStr;
    /**
     * 
     * @type {ModelsPacsSetupModelValueStr}
     * @memberof BodyPACSobjPortUpdateApiV1PACSservicePortPost
     */
    newPort: ModelsPacsSetupModelValueStr;
}

/**
 * Check if a given object implements the BodyPACSobjPortUpdateApiV1PACSservicePortPost interface.
 */
export function instanceOfBodyPACSobjPortUpdateApiV1PACSservicePortPost(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "objToUpdate" in value;
    isInstance = isInstance && "newPort" in value;

    return isInstance;
}

export function BodyPACSobjPortUpdateApiV1PACSservicePortPostFromJSON(json: any): BodyPACSobjPortUpdateApiV1PACSservicePortPost {
    return BodyPACSobjPortUpdateApiV1PACSservicePortPostFromJSONTyped(json, false);
}

export function BodyPACSobjPortUpdateApiV1PACSservicePortPostFromJSONTyped(json: any, ignoreDiscriminator: boolean): BodyPACSobjPortUpdateApiV1PACSservicePortPost {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'objToUpdate': ModelsPacsSetupModelValueStrFromJSON(json['objToUpdate']),
        'newPort': ModelsPacsSetupModelValueStrFromJSON(json['newPort']),
    };
}

export function BodyPACSobjPortUpdateApiV1PACSservicePortPostToJSON(value?: BodyPACSobjPortUpdateApiV1PACSservicePortPost | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'objToUpdate': ModelsPacsSetupModelValueStrToJSON(value.objToUpdate),
        'newPort': ModelsPacsSetupModelValueStrToJSON(value.newPort),
    };
}

