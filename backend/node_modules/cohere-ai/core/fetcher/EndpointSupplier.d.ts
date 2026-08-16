import type { EndpointMetadata } from "./EndpointMetadata";
import type { Supplier } from "./Supplier";
type EndpointSupplierFn<T> = (arg: {
    endpointMetadata?: EndpointMetadata;
}) => T | Promise<T>;
export type EndpointSupplier<T> = Supplier<T> | EndpointSupplierFn<T>;
export declare const EndpointSupplier: {
    get: <T>(supplier: EndpointSupplier<T>, arg: {
        endpointMetadata?: EndpointMetadata;
    }) => Promise<T>;
};
export {};
