/**
 * Plugin: TikTok Downloader
 * Deskripsi: Download video TikTok tanpa watermark lewat URL
 */

import axios from 'axios';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `*Contoh:* ${usedPrefix + command} https://vt.tiktok.com/xxxx/`;
  
  await m.reply('_Sabar ya boss, lagi gue ambilin videonya..._');

  try {
    // Menggunakan API Tiklydown (atau API lain yang lu punya)
    const response = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${args[0]}`);
    const data = response.data;

    if (!data || !data.video) throw 'Gagal ngambil data video, boss. Coba link lain.';

    const { title, author, video } = data;

    // Kirim videonya
    await conn.sendMessage(m.chat, {
      video: { url: video.noWatermark },
      caption: `✅ *TikTok Downloader*\n\n📌 *Judul:* ${title}\n👤 *Author:* ${author.nickname}\n\nSelamat menikmati, boss!`
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply('Waduh, ada error pas download. Pastiin linknya bener ya!');
  }
};

handler.help = ['tiktok'];
handler.tags = ['downloader'];
handler.command = /^(tt|tiktok|ttdl)$/i;

handler.limit = true; // Kasih limit biar gak spam

export default handler;