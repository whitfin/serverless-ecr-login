# Serverless ECR Login

[![Build Status](https://img.shields.io/github/actions/workflow/status/whitfin/serverless-ecr-login/ci.yml?branch=main)](https://github.com/whitfin/serverless-ecr-login/actions) [![Published Version](https://img.shields.io/npm/v/serverless-ecr-login.svg)](https://npmjs.com/package/serverless-ecr-login) [![Published Downloads](https://img.shields.io/npm/dt/serverless-ecr-login)](https://npmjs.com/package/serverless-ecr-login)

This repository contains a small [Serverless](https://serverless.com) plugin
to automatically login to ECR for Docker image deployments.

Normally the Serverless framework will handle logins automatically, but there
are occasionally bugs ([12895](https://github.com/serverless/serverless/issues/12895)
and [13116](https://github.com/serverless/serverless/issues/13116)) which cause this
to not work. Using this plugin can act as a workaround for these issues.

## Installation

This plugin is available via npm, so it can be installed as usual:

```bash
$ npm i --save-dev serverless-ecr-login
```

There's no need to include it in your production bundle, so make sure it's saved
inside the development dependencies. Once installed, make sure to add it to your
Serverless plugins list:

```yaml
plugins:
  - serverless-ecr-login
```

The location within the plugin list shouldn't matter, as it monitors the framework
lifecycle for activation. Docker login will automatically occur prior to deployment.

## Compatibility

This plugin has been tested against the Serverless v4 release, but will likely
work with many Serverless versions as it mainly uses the AWS CLI exposed by the
framework. If you have any issues, please do file an issue!
