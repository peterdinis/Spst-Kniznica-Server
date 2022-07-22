import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  MemoryHealthIndicator,
  SequelizeHealthIndicator
} from '@nestjs/terminus';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Application healt status')
@Controller('health')
class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private db: SequelizeHealthIndicator
  ) {}

  @ApiOperation({
    summary: "Check application status"
  })
  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      // the process should not use more than 300MB memory
      () =>
        this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      // The process should not have more than 300MB RSS memory allocated
      () =>
        this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
    ]);
  }

  @ApiOperation({
    summary: "Check database status"
  })
  @Get("/database")
  @HealthCheck()
  checkDb() {
    return this.healthCheckService.check([
      async () => this.db.pingCheck('sequelize'),
    ]);
  }
}

export default HealthController;
