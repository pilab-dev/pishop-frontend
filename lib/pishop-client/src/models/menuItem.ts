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
 * @interface MenuItem
 */
export interface MenuItem {
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    title?: string;
    /**
     * 
     * @type {string}
     * @memberof MenuItem
     */
    path?: string;
}

/**
 * Check if a given object implements the MenuItem interface.
 */
export function instanceOfMenuItem(value: object): value is MenuItem {
    return true;
}

export function MenuItemFromJSON(json: any): MenuItem {
    return MenuItemFromJSONTyped(json, false);
}

export function MenuItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): MenuItem {
    if (json == null) {
        return json;
    }
    return {
        
        'title': json['title'] == null ? undefined : json['title'],
        'path': json['path'] == null ? undefined : json['path'],
    };
}

export function MenuItemToJSON(json: any): MenuItem {
    return MenuItemToJSONTyped(json, false);
}

export function MenuItemToJSONTyped(value?: MenuItem | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'title': value['title'],
        'path': value['path'],
    };
}

