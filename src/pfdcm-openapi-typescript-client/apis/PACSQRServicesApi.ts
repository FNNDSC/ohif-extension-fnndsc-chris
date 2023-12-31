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


import * as runtime from '../runtime';
import type {
  BodyPACSPypxApiV1PACSSyncPypxPost,
  BodyPACSServiceHandlerApiV1PACSThreadPypxPost,
  HTTPValidationError,
  PACSasync,
} from '../models';
import {
    BodyPACSPypxApiV1PACSSyncPypxPostFromJSON,
    BodyPACSPypxApiV1PACSSyncPypxPostToJSON,
    BodyPACSServiceHandlerApiV1PACSThreadPypxPostFromJSON,
    BodyPACSServiceHandlerApiV1PACSThreadPypxPostToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
    PACSasyncFromJSON,
    PACSasyncToJSON,
} from '../models';

export interface PACSPypxApiV1PACSSyncPypxPostRequest {
    bodyPACSPypxApiV1PACSSyncPypxPost: BodyPACSPypxApiV1PACSSyncPypxPost;
}

export interface PACSServiceHandlerApiV1PACSThreadPypxPostRequest {
    bodyPACSServiceHandlerApiV1PACSThreadPypxPost: BodyPACSServiceHandlerApiV1PACSThreadPypxPost;
}

/**
 *
 */
export class PACSQRServicesApi extends runtime.BaseAPI {

    /**
     * POST a retrieve to the `PACSservice`, and capture return communication using the `listenerService`. The client will only receive a return payload when the PACSdirective has completed its remote execution.  Parameters ---------- - `PACSservice`:        name of the internal PACS service to query - `listenerService`:    name of the listener service to use locally - `PACSdirective`:      the pypx directive object  Return ------ - PACSqueryReturnModel
     *      Use this API route for STATUS operations and any others that block but     which are \"short lived\". Since this is a synchronous operation, the call     will only return on successful completion of the remote directive.
     */
    async pACSPypxApiV1PACSSyncPypxPostRaw(requestParameters: PACSPypxApiV1PACSSyncPypxPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<any>> {
        if (requestParameters.bodyPACSPypxApiV1PACSSyncPypxPost === null || requestParameters.bodyPACSPypxApiV1PACSSyncPypxPost === undefined) {
            throw new runtime.RequiredError('bodyPACSPypxApiV1PACSSyncPypxPost','Required parameter requestParameters.bodyPACSPypxApiV1PACSSyncPypxPost was null or undefined when calling pACSPypxApiV1PACSSyncPypxPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/PACS/sync/pypx/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BodyPACSPypxApiV1PACSSyncPypxPostToJSON(requestParameters.bodyPACSPypxApiV1PACSSyncPypxPost),
        }, initOverrides);

        if (this.isJsonMime(response.headers.get('content-type'))) {
            return new runtime.JSONApiResponse<any>(response);
        } else {
            return new runtime.TextApiResponse(response) as any;
        }
    }

    /**
     * POST a retrieve to the `PACSservice`, and capture return communication using the `listenerService`. The client will only receive a return payload when the PACSdirective has completed its remote execution.  Parameters ---------- - `PACSservice`:        name of the internal PACS service to query - `listenerService`:    name of the listener service to use locally - `PACSdirective`:      the pypx directive object  Return ------ - PACSqueryReturnModel
     *      Use this API route for STATUS operations and any others that block but     which are \"short lived\". Since this is a synchronous operation, the call     will only return on successful completion of the remote directive.
     */
    async pACSPypxApiV1PACSSyncPypxPost(requestParameters: PACSPypxApiV1PACSSyncPypxPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<any> {
        const response = await this.pACSPypxApiV1PACSSyncPypxPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Handler into PACS calls for long-lived compute (retrieve/push/register)  This is very thin and simple dispatching service that will either use the find module API, or will call the find module script. Anectodal testing has shown that the API calls might fail, possibly due to thread pool exhaustion?  At time of writing, the CLI calls seem more reliable since they introduce a single-queue concept by explicitly waiting for a CLI px-find process to finish. While this means that status calls are somewhat blocked when a RPR job is in flight, for multiple series pulls, the retrieve/push/register workflow proceeds correctly.  Args:     PACSservice (pacsQRmodel.ValueStr): The PACS with which to communicate     listenerService (pacsQRmodel.ValueStr): The listener service that receives PACS comms     PACSdirective (pacsQRmodel.PACSqueryCore): The instructions to the PACS
     *      Use this API route for RETRIEVE, PUSH, REGISTER operations and any others     that might be possibly \"long lived\". The actual processing is dispatched     to a separate thread so that the client receives a return immediately.     Clients should use a STATUS request on the same payload to determine     realtime status of the operation.
     */
    async pACSServiceHandlerApiV1PACSThreadPypxPostRaw(requestParameters: PACSServiceHandlerApiV1PACSThreadPypxPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PACSasync>> {
        if (requestParameters.bodyPACSServiceHandlerApiV1PACSThreadPypxPost === null || requestParameters.bodyPACSServiceHandlerApiV1PACSThreadPypxPost === undefined) {
            throw new runtime.RequiredError('bodyPACSServiceHandlerApiV1PACSThreadPypxPost','Required parameter requestParameters.bodyPACSServiceHandlerApiV1PACSThreadPypxPost was null or undefined when calling pACSServiceHandlerApiV1PACSThreadPypxPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/api/v1/PACS/thread/pypx/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BodyPACSServiceHandlerApiV1PACSThreadPypxPostToJSON(requestParameters.bodyPACSServiceHandlerApiV1PACSThreadPypxPost),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PACSasyncFromJSON(jsonValue));
    }

    /**
     * Handler into PACS calls for long-lived compute (retrieve/push/register)  This is very thin and simple dispatching service that will either use the find module API, or will call the find module script. Anectodal testing has shown that the API calls might fail, possibly due to thread pool exhaustion?  At time of writing, the CLI calls seem more reliable since they introduce a single-queue concept by explicitly waiting for a CLI px-find process to finish. While this means that status calls are somewhat blocked when a RPR job is in flight, for multiple series pulls, the retrieve/push/register workflow proceeds correctly.  Args:     PACSservice (pacsQRmodel.ValueStr): The PACS with which to communicate     listenerService (pacsQRmodel.ValueStr): The listener service that receives PACS comms     PACSdirective (pacsQRmodel.PACSqueryCore): The instructions to the PACS
     *      Use this API route for RETRIEVE, PUSH, REGISTER operations and any others     that might be possibly \"long lived\". The actual processing is dispatched     to a separate thread so that the client receives a return immediately.     Clients should use a STATUS request on the same payload to determine     realtime status of the operation.
     */
    async pACSServiceHandlerApiV1PACSThreadPypxPost(requestParameters: PACSServiceHandlerApiV1PACSThreadPypxPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PACSasync> {
        const response = await this.pACSServiceHandlerApiV1PACSThreadPypxPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
