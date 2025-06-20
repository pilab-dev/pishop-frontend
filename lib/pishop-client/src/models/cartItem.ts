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
import type { CartItemCost } from './cartItemCost';
import {
    CartItemCostFromJSON,
    CartItemCostFromJSONTyped,
    CartItemCostToJSON,
    CartItemCostToJSONTyped,
} from './cartItemCost';
import type { Merchandise } from './merchandise';
import {
    MerchandiseFromJSON,
    MerchandiseFromJSONTyped,
    MerchandiseToJSON,
    MerchandiseToJSONTyped,
} from './merchandise';

/**
 * 
 * @export
 * @interface CartItem
 */
export interface CartItem {
    /**
     * 
     * @type {string}
     * @memberof CartItem
     */
    id?: string;
    /**
     * 
     * @type {number}
     * @memberof CartItem
     */
    quantity?: number;
    /**
     * 
     * @type {CartItemCost}
     * @memberof CartItem
     */
    cost?: CartItemCost;
    /**
     * 
     * @type {Merchandise}
     * @memberof CartItem
     */
    merchandise?: Merchandise;
}

/**
 * Check if a given object implements the CartItem interface.
 */
export function instanceOfCartItem(value: object): value is CartItem {
    return true;
}

export function CartItemFromJSON(json: any): CartItem {
    return CartItemFromJSONTyped(json, false);
}

export function CartItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): CartItem {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'] == null ? undefined : json['id'],
        'quantity': json['quantity'] == null ? undefined : json['quantity'],
        'cost': json['cost'] == null ? undefined : CartItemCostFromJSON(json['cost']),
        'merchandise': json['merchandise'] == null ? undefined : MerchandiseFromJSON(json['merchandise']),
    };
}

export function CartItemToJSON(json: any): CartItem {
    return CartItemToJSONTyped(json, false);
}

export function CartItemToJSONTyped(value?: CartItem | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'quantity': value['quantity'],
        'cost': CartItemCostToJSON(value['cost']),
        'merchandise': MerchandiseToJSON(value['merchandise']),
    };
}

