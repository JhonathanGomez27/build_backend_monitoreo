import { LogsService } from './logs.service';
import { CreateLogDto } from './dto/create-log.dto';
import { FiltrosLogsDto } from './dto/filtrosLogs.dto';
import { FiltersPaginatedQuery } from 'src/common/filtersPaginatedQuery';
export declare class LogsController {
    private readonly logsService;
    constructor(logsService: LogsService);
    create(req: any, createLogDto: CreateLogDto): Promise<{
        ok: boolean;
        message: string;
    }>;
    getLogs(filtrosLogsDto: FiltrosLogsDto, query: FiltersPaginatedQuery): Promise<{
        logs: any[];
        total: number;
    }>;
}
