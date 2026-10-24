import type {
	ExpressiveCodeConfig,
	GiscusConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "spider 的博客",
	subtitle: "写代码，也记录生活",
	lang: "zh_CN",
	themeColor: {
		hue: 315,
		fixed: true,
	},
	banner: {
		enable: false,
		src: "assets/images/banner.webp",
		position: "center",
		credit: {
			enable: false,
			text: "",
			url: "",
		},
	},
	toc: {
		enable: true,
		depth: 2,
	},
	favicon: [],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{ name: "标签", url: "/tags/" },
		{ name: "分类", url: "/categories/" },
		LinkPreset.About,
	],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp",
	name: "spider",
	bio: "写代码，也记录生活。",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/Spiderkiler",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	theme: "github-dark",
};

// Giscus 评论，数据存放在 GitHub 公开仓库 Spiderkiler/ffdblog-comments 的
// Discussions（Announcements 分类）中。前提：该仓库已安装 Giscus App。
export const giscusConfig: GiscusConfig = {
	enable: true,
	repo: "Spiderkiler/ffdblog-comments",
	repoId: "R_kgDOVVpMjg",
	category: "Announcements",
	categoryId: "DIC_kwDOVVpMjs4DJfMe",
	mapping: "pathname",
	strict: false,
	reactionsEnabled: true,
	inputPosition: "top",
	lang: "zh-CN",
};
