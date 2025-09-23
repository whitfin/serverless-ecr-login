const spawn = require('child-process-ext/spawn');

/**
 * Plugin to login to the Serverless ECR.
 */
module.exports = class DockerPlugin {

    /**
     * Initializes this plugin.
     */
    constructor(serverless) {
        this.serverless = serverless;
        this.provider = serverless.getProvider('aws');
        this.hooks = {
            'after:package:createDeploymentArtifacts': async () => {
                let response = await this.provider.request('ECR',
                    'getAuthorizationToken',
                    {
                        // no params needed
                    },
                    this.provider.getStage(),
                    this.provider.getRegion()
                );

                // convert the response token back through the CLI format
                let token = response.authorizationData[0].authorizationToken;
                let login = Buffer.from(token, 'base64').toString('utf8');
                let [user, pass] = login.split(':', 2);

                // generate the name of the remote repository inside AWS
                let account = this.provider.cachedCredentials.accountId;
                let repository = `${account}.dkr.ecr.${this.provider.getRegion()}.amazonaws.com`;

                // login
                await spawn(
                    `docker login --username ${user} --password ${pass} ${repository}`,
                    { env: process.env },
                    { encoding: 'utf-8', shell: true, stdio: 'ignore' }
                );
            }
        };
    }
};
