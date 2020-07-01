import { Message } from './message.model';
export interface Chat {
    id?: string,
    buyer: string,
    seller: string,
    product: string,
    messages: Message[]
}