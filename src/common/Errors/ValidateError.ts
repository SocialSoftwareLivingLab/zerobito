export interface ValidateError {
    message: string;
    errors: Record<string, string[]>;
}
