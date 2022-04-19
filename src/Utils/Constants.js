exports.Badges = require('../Assets/js/Badge');

exports.Colors = {
	Default: 0x2f3136,
	Green: 0x77dd77,
	Yellow: 0xfdfd96,
	Orange: 0xffb347,
	Red: 0xff6961,
	Grey: 0xcfcfc4
};

exports.Emojis = {
	Alarm: '<:alarm:950481082191581224>',
	Info: '<:info:950481046821036082>',
	Online: '<:online:712397262256472075>',
	Idle: '<:idle:712397201955094708>',
	Dnd: '<:dnd:712397154836283392>',
	Offline: '<:offline:712397086100029440>',
	Verified: '<:verified:945933555089952848>'
};

exports.Links = {
	SupportServer: process.env.INVITE_LINK,
	GuildWebhook: process.env.GUILD_LOG_WEBHOOK_URL
};

exports.Secrets = {
	ImdbApiKey: process.env.IMDB_API_KEY,
	OpenWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
	SpotifyClientId: process.env.SPOTIFY_CLIENT_ID,
	SpotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
	YoutubeApiKey: process.env.YOUTUBE_API_KEY
};
