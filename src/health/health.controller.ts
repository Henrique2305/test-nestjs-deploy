import { Controller, Get } from '@nestjs/common';
import { RedisOptions, TcpClientOptions, Transport } from '@nestjs/microservices';
import { HealthCheck, HealthCheckService, MicroserviceHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private microservice: MicroserviceHealthIndicator,
        private db: TypeOrmHealthIndicator
      ) {}

    @Get()
    @HealthCheck()
    check() {
        return this.health.check([
          async () =>
            this.microservice.pingCheck<TcpClientOptions>('tcp', {
              transport: Transport.TCP,
              options: { host: 'localhost', port: 3001 },
            }),
          async () =>
            this.microservice.pingCheck<RedisOptions>('redis', {
              transport: Transport.REDIS,
              options: {
                host: 'localhost',
                port: 6379,
              },
            }),
          async () => this.db.pingCheck('database'),
        ]);
      }
}
