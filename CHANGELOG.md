# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
 
## [Unreleased]
 
### Added

- `DEFAULT_ROLE` -> `admin` | `superuser` | `user` - with `user` being the default, making it possible that new users can create their own forms after creating
- `LOGIN_NOTE` -> markdown for Login Page, to show info text on login page
- `HIDE_CONTRIB` -> ability to hide contribution banner

### Changed
### Fixed

- di on setting resolver, prevented signup settings to be visible in ui
- return admin of form also for admins

### Security

## [0.9.4] - 2020-06-09
 
### Added

- `SIGNUP_DISABLED=true` to prevent users from signing up 
- travis lints

### Fixed

- startup error with invalid create admin config

## [0.9.2]

### Security

- update apollo-server for https://github.com/advisories/GHSA-w42g-7vfc-xf37
 
## [0.9.1] - 2020-06-02

### Added

- form field options
- form field rating settings
- form field logic jump settings

### Changed

- improved documentation
- Installation Metrics

### Fixed

- anonymous submission of forms
