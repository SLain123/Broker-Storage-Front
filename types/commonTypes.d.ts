export type StatusType = 'active' | 'inactive';

export interface IResponseError {
    errors?: { msg: string }[];
    message?: string;
    status?: string;
}
