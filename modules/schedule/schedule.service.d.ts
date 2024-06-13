import { PubSubService } from '../pubsub/pub-sub-services/pub-sub.service';
export declare class ScheduleService {
    private readonly pubSubService;
    constructor(pubSubService: PubSubService);
    handleCron(): void;
}
