require('dotenv').config();
const { Telegraf } = require('telegraf');
const fetch = require('node-fetch');

const { API_TOKEN } = process.env;

const bot = new Telegraf(API_TOKEN);

bot.on('new_chat_members', async (ctx) => {
  const member = ctx.update.message.new_chat_member;
  //   const kor = ctx.chat.id !== -522324840;

  try {
    const res = await fetch(`https://api.cas.chat/check?user_id=${member.id}`);
    const data = await res.json();

    if (!data.ok) {
      //   if (kor) return ctx.reply(`${member.first_name}, 안녕하세요! 반갑습니다!🖐😊`);
      return ctx.reply(`Welcome to BTour Community, ${member.first_name}!🖐😊`);
    }
    if (data.ok) return ctx.banChatMember(member.id, undefined, { revoke_messages: true });
  } catch (err) {
    console.log(err);
  }
});

bot.launch();
