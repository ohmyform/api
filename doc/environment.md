# Environment Variables

| Name | Default Value | Description |
| ---- | ------------- | ----------- |
| DISABLE_INSTALLATION_METRICS | *not set* | Per default installations are [publishing](./installation.metrics.md) their existence |
| SECRET_KEY | `changeMe` | JWT Secret for authentication |
| MONGODB_URI | `mongodb://localhost/ohmyform` | MongoDB Connection |
| MAILER_URI | `smtp://localhost:1025` | [Mail Connection](https://nodemailer.com/smtp/) |
| MAILER_FROM | `OhMyForm <no-reply@localhost>` | Default From path, make sure that your mail server supports the given from addres |
| CLI | *automatically* | activates pretty print for log output |
| NODE_ENV | `production` | |

