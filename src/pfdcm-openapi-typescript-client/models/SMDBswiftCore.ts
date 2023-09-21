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
 * The SMDB swift service model
 * @export
 * @interface SMDBswiftCore
 */
export interface SMDBswiftCore {
    /**
     * 
     * @type {string}
     * @memberof SMDBswiftCore
     */
    ip: string;
    /**
     * 
     * @type {string}
     * @memberof SMDBswiftCore
     */
    port: string;
    /**
     * 
     * @type {string}
     * @memberof SMDBswiftCore
     */
    login: string;
}

/**
 * Check if a given object implements the SMDBswiftCore interface.
 */
export function instanceOfSMDBswiftCore(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "ip" in value;
    isInstance = isInstance && "port" in value;
    isInstance = isInstance && "login" in value;

    return isInstance;
}

export function SMDBswiftCoreFromJSON(json: any): SMDBswiftCore {
    return SMDBswiftCoreFromJSONTyped(json, false);
}

export function SMDBswiftCoreFromJSONTyped(json: any, ignoreDiscriminator: boolean): SMDBswiftCore {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'ip': json['ip'],
        'port': json['port'],
        'login': json['login'],
    };
}

export function SMDBswiftCoreToJSON(value?: SMDBswiftCore | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'ip': value.ip,
        'port': value.port,
        'login': value.login,
    };
}
