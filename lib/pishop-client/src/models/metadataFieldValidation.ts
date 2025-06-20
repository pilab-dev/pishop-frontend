/* tslint:disable */
/* eslint-disable */
/**
 * PiShop REST API
 * This is the API documentation for PiShop.   It contains all the endpoints for the PiShop API. The API is exposed at [http://shop.pilab.hu/api/v1](http://shop.pilab.hu/api/v1).  The API is based on [OpenAPI](https://swagger.io/specification/), which is a standard for the description of APIs.  # Webshop API Overview  This API provides access to the core functionalities of our webshop, allowing developers to integrate with our platform. Key features include:  * **Product Catalog:** Retrieve detailed information about our products, including descriptions, images, and pricing. * **Cart Management:** Add, remove, and update items in the user\'s cart. * **Order Management:** Create, update, and track customer orders. * **Customer Management:** Manage customer accounts and profiles. * **Discounts and Promotions:** Apply discounts and promotions to products. * **Image Management:** Upload and manage product images. * **Pages and Menus:** Create and manage pages and menus. * **Authentication:** Secure access to protected resources using Bearer authentication (JWT).  This documentation outlines the available endpoints, request/response formats, and authentication procedures. Use this information to build powerful integrations and enhance your customer experience. 
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: gyula@pilab.hu
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface MetadataFieldValidation
 */
export interface MetadataFieldValidation {
    /**
     * 
     * @type {boolean}
     * @memberof MetadataFieldValidation
     */
    required?: boolean;
    /**
     * 
     * @type {number}
     * @memberof MetadataFieldValidation
     */
    min?: number;
    /**
     * 
     * @type {number}
     * @memberof MetadataFieldValidation
     */
    max?: number;
    /**
     * 
     * @type {string}
     * @memberof MetadataFieldValidation
     */
    pattern?: string;
    /**
     * 
     * @type {string}
     * @memberof MetadataFieldValidation
     */
    format?: string;
    /**
     * 
     * @type {number}
     * @memberof MetadataFieldValidation
     */
    minLength?: number;
    /**
     * 
     * @type {number}
     * @memberof MetadataFieldValidation
     */
    maxLength?: number;
}

/**
 * Check if a given object implements the MetadataFieldValidation interface.
 */
export function instanceOfMetadataFieldValidation(value: object): value is MetadataFieldValidation {
    return true;
}

export function MetadataFieldValidationFromJSON(json: any): MetadataFieldValidation {
    return MetadataFieldValidationFromJSONTyped(json, false);
}

export function MetadataFieldValidationFromJSONTyped(json: any, ignoreDiscriminator: boolean): MetadataFieldValidation {
    if (json == null) {
        return json;
    }
    return {
        
        'required': json['required'] == null ? undefined : json['required'],
        'min': json['min'] == null ? undefined : json['min'],
        'max': json['max'] == null ? undefined : json['max'],
        'pattern': json['pattern'] == null ? undefined : json['pattern'],
        'format': json['format'] == null ? undefined : json['format'],
        'minLength': json['minLength'] == null ? undefined : json['minLength'],
        'maxLength': json['maxLength'] == null ? undefined : json['maxLength'],
    };
}

export function MetadataFieldValidationToJSON(json: any): MetadataFieldValidation {
    return MetadataFieldValidationToJSONTyped(json, false);
}

export function MetadataFieldValidationToJSONTyped(value?: MetadataFieldValidation | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'required': value['required'],
        'min': value['min'],
        'max': value['max'],
        'pattern': value['pattern'],
        'format': value['format'],
        'minLength': value['minLength'],
        'maxLength': value['maxLength'],
    };
}

