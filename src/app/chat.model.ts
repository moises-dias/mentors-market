import { Message } from './message.model';
export class Chat {
    constructor(
        public id: string,
        public buyer: string,
        public seller: string,
        public messages: Message[]
    ) { }
}