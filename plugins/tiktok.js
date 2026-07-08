import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*Contoh:* ${usedPrefix + command} https://vt.tiktok.com/xxxx/`;
  
  await m.reply('_Sabar ya boss, lagi gue proses data lengkapnya..._');

  try {
    const response = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${args[0]}`);
    const data = response.data;

    if (!data) throw 'Gagal ngambil data, boss. Coba link lain.';

    const { title, author, stats, video, images, music } = data;
    let caption = `✅ *TikTok Downloader - Full Info*\n\n`;
    caption += `📌 *Judul:* ${title}\n`;
    caption += `👤 *Author:* ${author.nickname} (@${author.unique_id})\n\n`;
    caption += `📊 *Stats:* \n`;
    caption += `💬 ${stats.commentCount} | ❤️ ${stats.likeCount} | ↗️ ${stats.shareCount} | 👀 ${stats.playCount}\n\n`;
    caption += `🎵 *Music:* ${music.title} - ${music.author}\n`;
    caption += `\nSelamat menikmati, boss!`;

    // Jika formatnya Video
    if (video && video.noWatermark) {
        await conn.sendMessage(m.chat, { 
            video: { url: video.noWatermark }, 
            caption: caption
        }, { quoted: m });
    } 
    // Jika formatnya Slideshow (Foto)
    else if (images && images.length > 0) {
        for (let img of images) {
            await conn.sendMessage(m.chat, { image: { url: img.url } }, { quoted: m });
        }
        await m.reply(caption);
    }

    // Kirim Audionya sekalian biar lengkap
    await conn.sendMessage(m.chat, { 
        audio: { url: music.play_url }, 
        mimetype: 'audio/mpeg', 
        ptt: false 
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('Waduh, ada error pas proses "Fitur Lengkap". Pastiin linknya bener ya!');
  }
};

handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(tt|tiktok|ttdl)$/i;
handler.limit = true;

export default handler;