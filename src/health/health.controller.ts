import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HealthCheck,
  SequelizeHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
} from '@nestjs/terminus';
import {ApiTags} from "@nestjs/swagger";
 
@ApiTags("Application healt status")
@Controller('health')
class HealthController {
  constructor(
    private healthCheckService: HealthCheckService,
    private sequelizeHealthIndicator: SequelizeHealthIndicator,
    private memoryHealthIndicator: MemoryHealthIndicator,
    private diskHealthIndicator: DiskHealthIndicator
  ) {}
 
  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () => this.sequelizeHealthIndicator.pingCheck('database'),
      // the process should not use more than 300MB memory
      () => this.memoryHealthIndicator.checkHeap('memory heap', 300 * 1024 * 1024),
      // The process should not have more than 300MB RSS memory allocated
      () => this.memoryHealthIndicator.checkRSS('memory RSS', 300 * 1024 * 1024),
      // the used disk storage should not exceed the 50% of the available space
      () => this.diskHealthIndicator.checkStorage('disk health', {
        thresholdPercent: 0.5, path: '/'
      })
    ]);
  }
}
 
export default HealthController;