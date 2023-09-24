/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.BASE_URL ?? 'http://localhost:3000/',
    generateRobotsTxt: true,
    exclude: ["*/404", "*/500", "*/login", "*/api/auth", "*/admin-event", "*/images/*", "*/admin-location"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["*/404", "*/login", "*/500", "*/api/auth", "*/admin-event", "*/images/*", "*/admin-location"]
            }
        ]
    },
    transform: async (config, path) => {
        if((path[0] == '/' && ((path[1] == 'b' && path[2] == 's') || (path[1] == 'd' && path[2] == 'e')) && path[3] == '/') || path.length == 3) {
            return;
        }

        if(path.includes('/groupes/')) {
            let replaced = path.replace('/groupes/', '');
            if(parseInt(replaced)) return;
        };
        return {
            loc: path,
            changefreq: config.changefreq,
            priority: config.priority,
            lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
            alternateRefs: config.alternateRefs ?? []
        }
    }
}