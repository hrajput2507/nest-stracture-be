import { Controller, Get } from "@nestjs/common";
import { HealthCheck, HealthCheckService, HttpHealthIndicator, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { ConfigurationService } from "src/config/config.service";

@Controller('health')
export class HealthCheckController {
    constructor(
        private healthCheckService: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,
        private readonly config: ConfigurationService,

    ) { }

    @HealthCheck()
    @Get()
    checkHealth() {
        return this.healthCheckService.check([
            () => this.db.pingCheck('library'),
            // () => this.http.pingCheck('Basic Check',this.config.get("HEALTH_CHECK_URL")),
        ]);
    }
}