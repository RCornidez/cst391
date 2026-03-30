export interface DropletConfig {
    serverName: string;
    serverSize: string;
    githubRepoUrl: string | null;
}

export interface DropletResult {
    dropletId: string;
    ipAddress: string;
    provisionedAt: Date;
    success: boolean;
}

const rand = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

const generateMockIp = (): string =>
    `${rand(10, 203)}.${rand(0, 255)}.${rand(0, 255)}.${rand(1, 254)}`;

const generateMockDropletId = (): string =>
    `${rand(100000000, 999999999)}`;

export const provisionDroplet = async (config: DropletConfig): Promise<DropletResult> => {

    // in here we will be provisioning the droplet and cloning the optional github repo

    console.log(`[provision.service] Mock provisioning droplet: ${config.serverName} (${config.serverSize})`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
        dropletId: generateMockDropletId(),
        ipAddress: generateMockIp(),
        provisionedAt: new Date(),
        success: true,
    };
};

export const deprovisionDroplet = async (dropletId: string): Promise<boolean> => {

    console.log(`[provision.service] Mock deprovisioning droplet ID: ${dropletId}`);

    await new Promise(resolve => setTimeout(resolve, 500));

    return true;
};