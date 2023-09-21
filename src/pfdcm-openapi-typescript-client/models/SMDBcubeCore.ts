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
 * The SMDB cube service model
 * @export
 * @interface SMDBcubeCore
 */
export interface SMDBcubeCore {
    /**
     * 
     * @type {string}
     * @memberof SMDBcubeCore
     */
    url: string;
    /**
     * 
     * @type {string}
     * @memberof SMDBcubeCore
     */
    username: string;
    /**
     * 
     * @type {string}
     * @memberof SMDBcubeCore
     */
    password: string;
}

/**
 * Check if a given object implements the SMDBcubeCore interface.
 */
export function instanceOfSMDBcubeCore(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "url" in value;
    isInstance = isInstance && "username" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function SMDBcubeCoreFromJSON(json: any): SMDBcubeCore {
    return SMDBcubeCoreFromJSONTyped(json, false);
}

export function SMDBcubeCoreFromJSONTyped(json: any, ignoreDiscriminator: boolean): SMDBcubeCore {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': json['url'],
        'username': json['username'],
        'password': json['password'],
    };
}

export function SMDBcubeCoreToJSON(value?: SMDBcubeCore | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'url': value.url,
        'username': value.username,
        'password': value.password,
    };
}

