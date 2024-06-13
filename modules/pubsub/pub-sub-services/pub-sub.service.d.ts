/// <reference types="node" />
import { EventEmitter } from 'events';
import { DataInterface } from '../interfaces/data.interface';
export declare class PubSubService extends EventEmitter {
    constructor();
    publish(topic: string, data?: DataInterface): void;
    subscribe(topic: string, handler: (...args: any[]) => void): void;
    unsubscribe(topic: string, handler: (...args: any[]) => void): void;
}
