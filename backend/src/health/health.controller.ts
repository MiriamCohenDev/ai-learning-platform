import { Controller, Get } from '@nestjs/common';

/**
 * HealthController provides a simple endpoint to check the backend service status.
 *
 * Purpose:
 * - Ensures that the backend is up and running.
 * - Useful in environments like Docker Compose, where the frontend
 *   may need to wait until the backend is fully initialized.
 * - Can be used by monitoring tools or orchestrators to verify service health.
 *
 * Endpoint:
 * GET /health
 * Returns a simple JSON object indicating the service is operational.
 */
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok' };
  }
}
