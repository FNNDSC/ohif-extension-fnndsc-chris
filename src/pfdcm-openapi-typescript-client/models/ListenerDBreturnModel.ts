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
import type { DcmtkDBReturnModel } from './DcmtkDBReturnModel';
import {
    DcmtkDBReturnModelFromJSON,
    DcmtkDBReturnModelFromJSONTyped,
    DcmtkDBReturnModelToJSON,
} from './DcmtkDBReturnModel';
import type { XinetdDBReturnModel } from './XinetdDBReturnModel';
import {
    XinetdDBReturnModelFromJSON,
    XinetdDBReturnModelFromJSONTyped,
    XinetdDBReturnModelToJSON,
} from './XinetdDBReturnModel';

/**
 * A full model that is returned from a call to the DB
 * @export
 * @interface ListenerDBreturnModel
 */
export interface ListenerDBreturnModel {
    /**
     * 
     * @type {XinetdDBReturnModel}
     * @memberof ListenerDBreturnModel
     */
    xinetd: XinetdDBReturnModel;
    /**
     * 
     * @type {DcmtkDBReturnModel}
     * @memberof ListenerDBreturnModel
     */
    dcmtk: DcmtkDBReturnModel;
}

/**
 * Check if a given object implements the ListenerDBreturnModel interface.
 */
export function instanceOfListenerDBreturnModel(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "xinetd" in value;
    isInstance = isInstance && "dcmtk" in value;

    return isInstance;
}

export function ListenerDBreturnModelFromJSON(json: any): ListenerDBreturnModel {
    return ListenerDBreturnModelFromJSONTyped(json, false);
}

export function ListenerDBreturnModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): ListenerDBreturnModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'xinetd': XinetdDBReturnModelFromJSON(json['xinetd']),
        'dcmtk': DcmtkDBReturnModelFromJSON(json['dcmtk']),
    };
}

export function ListenerDBreturnModelToJSON(value?: ListenerDBreturnModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'xinetd': XinetdDBReturnModelToJSON(value.xinetd),
        'dcmtk': DcmtkDBReturnModelToJSON(value.dcmtk),
    };
}

