const config = require('../config')
const { cmd } = require('../command')
const os = require("os")
const { runtime, sleep } = require('../lib/functions')
const axios = require('axios')

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository"],
    desc: "Show the bot's GitHub repository",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Pkphotographer1911/PK-XMD';

    try {
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        const response = await axios.get(`https://api.github.com/repos/pkphotographer1911/PK-XMD`);
        const repoData = response.data;

        const formattedInfo = `
╭─〔 *PK-XMD REPOSITORY* 〕
│
├─ *📌 Repo Name:* ${repoData.name}
├─ *👤 Owner:* ${repoData.owner.login}
├─ *⭐ Stars:* ${repoData.stargazers_count}
├─ *⑂ Forks:* ${repoData.forks_count}
├─ *📄 Description:* ${repoData.description || 'Powerful WhatsApp Multi-Device Bot by Pkdriller'}
│
├─ *🔗 GitHub Link:*
│   ${repoData.html_url}
│
├─ *🌍 Channel:*
│   https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x
│
╰─ *🚀 Powered by Pkdriller*
`.trim();

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/fgiecg.jpg` }, // you can change image
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363288304618280@newsletter',
                    newsletterName: 'PK-XMD UPDATES',
                    serverMessageId: 110
                }
            }
        }, { quoted: {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "PK-XMD VERIFIED",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:PK-XMD;BOT;;;\nFN:PK-XMD\nitem1.TEL;waid=254700000000:+254 700 000000\nitem1.X-ABLabel:Bot\nEND:VCARD`
                }
            }
        } });

    } catch (error) {
        console.error("❌ Error fetching repo:", error);
        reply("❌ Failed to fetch repository info. Please try again later.");
    }
});
