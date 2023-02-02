module.exports = {
    siteUrl: process.env.BASE_URL ?? 'http://localhost:3000/',
    generateRobotsTxt: true,
    exclude: ["*/404", "*/500", "*/login"],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["*/404", "*/login", "*/500"]
            }
        ]
    }
}