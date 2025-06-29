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
import type { SelectedOption } from './selectedOption';
import {
    SelectedOptionFromJSON,
    SelectedOptionFromJSONTyped,
    SelectedOptionToJSON,
    SelectedOptionToJSONTyped,
} from './selectedOption';
import type { Price } from './price';
import {
    PriceFromJSON,
    PriceFromJSONTyped,
    PriceToJSON,
    PriceToJSONTyped,
} from './price';
import type { ProductVariantPrice } from './productVariantPrice';
import {
    ProductVariantPriceFromJSON,
    ProductVariantPriceFromJSONTyped,
    ProductVariantPriceToJSON,
    ProductVariantPriceToJSONTyped,
} from './productVariantPrice';

/**
 * 
 * @export
 * @interface ProductVariant
 */
export interface ProductVariant {
    /**
     * Unique identifier for the variant
     * @type {string}
     * @memberof ProductVariant
     */
    id: string;
    /**
     * Title of the variant
     * @type {string}
     * @memberof ProductVariant
     */
    title: string;
    /**
     * Whether the variant is available for sale
     * @type {boolean}
     * @memberof ProductVariant
     */
    availableForSale: boolean;
    /**
     * Selected options for the variant.
     * @type {Array<SelectedOption>}
     * @memberof ProductVariant
     */
    selectedOptions: Array<SelectedOption>;
    /**
     * 
     * @type {ProductVariantPrice}
     * @memberof ProductVariant
     */
    price: ProductVariantPrice;
    /**
     * 
     * @type {Price}
     * @memberof ProductVariant
     */
    compareAtPrice?: Price;
    /**
     * Stock keeping unit
     * @type {string}
     * @memberof ProductVariant
     */
    sku: string;
    /**
     * Position of the variant in the list
     * @type {number}
     * @memberof ProductVariant
     */
    position: number;
    /**
     * Available inventory quantity
     * @type {number}
     * @memberof ProductVariant
     */
    inventoryQuantity: number;
    /**
     * Cost per item for inventory
     * @type {number}
     * @memberof ProductVariant
     */
    inventoryCost?: number | null;
    /**
     * Whether the variant requires shipping
     * @type {boolean}
     * @memberof ProductVariant
     */
    requiresShipping: boolean;
    /**
     * Whether the variant is taxable
     * @type {boolean}
     * @memberof ProductVariant
     */
    taxable: boolean;
    /**
     * Weight of the variant
     * @type {number}
     * @memberof ProductVariant
     */
    weight: number;
    /**
     * Unit of weight measurement
     * @type {string}
     * @memberof ProductVariant
     */
    weightUnit: ProductVariantWeightUnitEnum;
    /**
     * Options for the variant
     * @type {{ [key: string]: string; }}
     * @memberof ProductVariant
     */
    options?: { [key: string]: string; };
}


/**
 * @export
 */
export const ProductVariantWeightUnitEnum = {
    Kg: 'KG',
    Lb: 'LB',
    Oz: 'OZ',
    G: 'G'
} as const;
export type ProductVariantWeightUnitEnum = typeof ProductVariantWeightUnitEnum[keyof typeof ProductVariantWeightUnitEnum];


/**
 * Check if a given object implements the ProductVariant interface.
 */
export function instanceOfProductVariant(value: object): value is ProductVariant {
    if (!('id' in value) || value['id'] === undefined) return false;
    if (!('title' in value) || value['title'] === undefined) return false;
    if (!('availableForSale' in value) || value['availableForSale'] === undefined) return false;
    if (!('selectedOptions' in value) || value['selectedOptions'] === undefined) return false;
    if (!('price' in value) || value['price'] === undefined) return false;
    if (!('sku' in value) || value['sku'] === undefined) return false;
    if (!('position' in value) || value['position'] === undefined) return false;
    if (!('inventoryQuantity' in value) || value['inventoryQuantity'] === undefined) return false;
    if (!('requiresShipping' in value) || value['requiresShipping'] === undefined) return false;
    if (!('taxable' in value) || value['taxable'] === undefined) return false;
    if (!('weight' in value) || value['weight'] === undefined) return false;
    if (!('weightUnit' in value) || value['weightUnit'] === undefined) return false;
    return true;
}

export function ProductVariantFromJSON(json: any): ProductVariant {
    return ProductVariantFromJSONTyped(json, false);
}

export function ProductVariantFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProductVariant {
    if (json == null) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'availableForSale': json['availableForSale'],
        'selectedOptions': ((json['selectedOptions'] as Array<any>).map(SelectedOptionFromJSON)),
        'price': ProductVariantPriceFromJSON(json['price']),
        'compareAtPrice': json['compareAtPrice'] == null ? undefined : PriceFromJSON(json['compareAtPrice']),
        'sku': json['sku'],
        'position': json['position'],
        'inventoryQuantity': json['inventoryQuantity'],
        'inventoryCost': json['inventoryCost'] == null ? undefined : json['inventoryCost'],
        'requiresShipping': json['requiresShipping'],
        'taxable': json['taxable'],
        'weight': json['weight'],
        'weightUnit': json['weightUnit'],
        'options': json['options'] == null ? undefined : json['options'],
    };
}

export function ProductVariantToJSON(json: any): ProductVariant {
    return ProductVariantToJSONTyped(json, false);
}

export function ProductVariantToJSONTyped(value?: ProductVariant | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        'id': value['id'],
        'title': value['title'],
        'availableForSale': value['availableForSale'],
        'selectedOptions': ((value['selectedOptions'] as Array<any>).map(SelectedOptionToJSON)),
        'price': ProductVariantPriceToJSON(value['price']),
        'compareAtPrice': PriceToJSON(value['compareAtPrice']),
        'sku': value['sku'],
        'position': value['position'],
        'inventoryQuantity': value['inventoryQuantity'],
        'inventoryCost': value['inventoryCost'],
        'requiresShipping': value['requiresShipping'],
        'taxable': value['taxable'],
        'weight': value['weight'],
        'weightUnit': value['weightUnit'],
        'options': value['options'],
    };
}

