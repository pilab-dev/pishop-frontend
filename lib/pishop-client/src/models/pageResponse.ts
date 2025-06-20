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
import type { SEO } from './sEO';
import {
    SEOFromJSON,
    SEOFromJSONTyped,
    SEOToJSON,
    SEOToJSONTyped,
} from './sEO';

/**
 * 
 * @export
 * @interface PageResponse
 */
export interface PageResponse {
    /**
     * 
     * @type {string}
     * @memberof PageResponse
     */
    id?: string;
    /**
     * 
     * @type {string}
     * @memberof PageResponse
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof PageResponse
     */
    handle?: string;
    /**
     * 
     * @type {string}
     * @memberof PageResponse
     */
    body?: string;
    /**
     * 
     * @type {string}
     * @memberof PageResponse
     */
    bodySummary?: string;
    /**
     * 
     * @type {SEO}
     * @memberof PageResponse
     */
    seo?: SEO;
    /**
     * 
     * @type {Date}
     * @memberof PageResponse
     */
    createdAt?: Date;
    /**
     * 
     * @type {Date}
     * @memberof PageResponse
     */
    updatedAt?: Date;
}

/**
 * Check if a given object implements the PageResponse interface.
 */
export function instanceOfPageResponse(value: object): value is PageResponse {
    return true;
}

export function PageResponseFromJSON(json: any): PageResponse {
    return PageResponseFromJSONTyped(json, false);
}

export function PageResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): PageResponse {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'title': json['title'] == null ? undefined : json['title'],
        'handle': json['handle'] == null ? undefined : json['handle'],
        'body': json['body'] == null ? undefined : json['body'],
        'bodySummary': json['bodySummary'] == null ? undefined : json['bodySummary'],
        'seo': json['seo'] == null ? undefined : SEOFromJSON(json['seo']),
        'createdAt': json['createdAt'] == null ? undefined : (new Date(json['createdAt'])),
        'updatedAt': json['updatedAt'] == null ? undefined : (new Date(json['updatedAt'])),
    };
}

export function PageResponseToJSON(json: any): PageResponse {
    return PageResponseToJSONTyped(json, false);
}

export function PageResponseToJSONTyped(value?: PageResponse | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'handle': value['handle'],
        'body': value['body'],
        'bodySummary': value['bodySummary'],
        'seo': SEOToJSON(value['seo']),
        'createdAt': value['createdAt'] == null ? undefined : ((value['createdAt']).toISOString()),
        'updatedAt': value['updatedAt'] == null ? undefined : ((value['updatedAt']).toISOString()),
    };
}

