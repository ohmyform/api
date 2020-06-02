# Installation Metrics

OhMyForm sends a PING during startup as well as once 
every hour to get instights on where OhMyForm is used.

If you feed that this should not happen you can disable
this behavior by setting the environment variable 
`DISABLE_INSTALLATION_METRICS=1`

You can take a look [here](../src/service/installation.metrics.service.ts) to see how we trigger the metric 
collection
