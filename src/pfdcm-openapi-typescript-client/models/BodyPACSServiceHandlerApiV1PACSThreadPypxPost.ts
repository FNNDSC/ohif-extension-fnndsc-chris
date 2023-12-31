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
import type { ModelsPacsQRmodelValueStr } from './ModelsPacsQRmodelValueStr';
import {
    ModelsPacsQRmodelValueStrFromJSON,
    ModelsPacsQRmodelValueStrFromJSONTyped,
    ModelsPacsQRmodelValueStrToJSON,
} from './ModelsPacsQRmodelValueStr';
import type { PACSqueryCore } from './PACSqueryCore';
import {
    PACSqueryCoreFromJSON,
    PACSqueryCoreFromJSONTyped,
    PACSqueryCoreToJSON,
} from './PACSqueryCore';

/**
 * 
 * @export
 * @interface BodyPACSServiceHandlerApiV1PACSThreadPypxPost
 */
export interface BodyPACSServiceHandlerApiV1PACSThreadPypxPost {
    /**
     * 
     * @type {ModelsPacsQRmodelValueStr}
     * @memberof BodyPACSServiceHandlerApiV1PACSThreadPypxPost
     */
    pACSservice: ModelsPacsQRmodelValueStr;
    /**
     * 
     * @type {ModelsPacsQRmodelValueStr}
     * @memberof BodyPACSServiceHandlerApiV1PACSThreadPypxPost
     */
    listenerService: ModelsPacsQRmodelValueStr;
    /**
     * 
     * @type {PACSqueryCore}
     * @memberof BodyPACSServiceHandlerApiV1PACSThreadPypxPost
     */
    pACSdirective: PACSqueryCore;
}

/**
 * Check if a given object implements the BodyPACSServiceHandlerApiV1PACSThreadPypxPost interface.
 */
export function instanceOfBodyPACSServiceHandlerApiV1PACSThreadPypxPost(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "pACSservice" in value;
    isInstance = isInstance && "listenerService" in value;
    isInstance = isInstance && "pACSdirective" in value;

    return isInstance;
}

export function BodyPACSServiceHandlerApiV1PACSThreadPypxPostFromJSON(json: any): BodyPACSServiceHandlerApiV1PACSThreadPypxPost {
    return BodyPACSServiceHandlerApiV1PACSThreadPypxPostFromJSONTyped(json, false);
}

export function BodyPACSServiceHandlerApiV1PACSThreadPypxPostFromJSONTyped(json: any, ignoreDiscriminator: boolean): BodyPACSServiceHandlerApiV1PACSThreadPypxPost {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'pACSservice': ModelsPacsQRmodelValueStrFromJSON(json['PACSservice']),
        'listenerService': ModelsPacsQRmodelValueStrFromJSON(json['listenerService']),
        'pACSdirective': PACSqueryCoreFromJSON(json['PACSdirective']),
    };
}

export function BodyPACSServiceHandlerApiV1PACSThreadPypxPostToJSON(value?: BodyPACSServiceHandlerApiV1PACSThreadPypxPost | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'PACSservice': ModelsPacsQRmodelValueStrToJSON(value.pACSservice),
        'listenerService': ModelsPacsQRmodelValueStrToJSON(value.listenerService),
        'PACSdirective': PACSqueryCoreToJSON(value.pACSdirective),
    };
}

