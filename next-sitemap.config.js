/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://historiaintelectualufmg.com.br',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/404', '/500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
  },
};
