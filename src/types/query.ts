import {Locale} from "./locale";
import {Filters} from "./filters";
import {BaseType} from "./utils";
import {Sort} from "./sort";
import {Populate} from "./populate";
import {Pagination} from "./pagination";

export interface Query<T extends BaseType> {
    locale?: Locale
    filters?: Filters<T>
    publicationState?: "live" | "preview"
    pagination?: Pagination
    sort?: Sort<T>
    fields?: (keyof T["attributes"])[]
    populate?: Populate<T>
}
