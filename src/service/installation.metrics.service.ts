import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import MatomoTracker from 'matomo-tracker';
import { PinoLogger } from 'nestjs-pino/dist';

@Injectable()
export class InstallationMetricsService implements OnApplicationBootstrap {
  private host = 'https://metrics.ohmyform.com/matomo.php'

  constructor(
    private readonly logger: PinoLogger,
  ) {
  }

  async onApplicationBootstrap(): Promise<void> {
    const tracker = new MatomoTracker(1, this.host)

    tracker.on('error', () => {
      this.logger.error('failed to register instance')
    })

    tracker.track({
      // eslint-disable-next-line @typescript-eslint/camelcase
      action_name: 'startup',
      ua: process.arch
    })
  }


}
