import type { AuthProvider } from "./AuthProvider";
import type { AuthRequest } from "./AuthRequest";
export declare class NoOpAuthProvider implements AuthProvider {
    getAuthRequest(): Promise<AuthRequest>;
}
