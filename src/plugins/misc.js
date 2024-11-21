global.commands = [];

function cmd(command) {
    global.commands.push(command);
}

const commands = [];

function cmd(command) {
    commands.push(command);
}

// Ping command
cmd({
    pattern: "ping",
    description: "Get the bot's ping.",
    type: "misc",
    isPremium: false,
    execute: async (m, sock, mek, config, startTime, sendButtonMessage) => {
        const response = await sock.sendMessage(mek.remoteJid, { text: "*Pinging...*" });
        const start = Date.now();
        await sock.sendMessage(mek.remoteJid, { text: "*[□□□□□]*", edit: response.key });
        await sock.sendMessage(mek.remoteJid, { text: `*[■□□□□]*`, edit: response.key });
        await sock.sendMessage(mek.remoteJid, { text: `*[■■■□□]*`, edit: response.key });
        await sock.sendMessage(mek.remoteJid, { text: `*[■■■■□]*`, edit: response.key });
        await sock.sendMessage(mek.remoteJid, { text: `*[■■■■■]*`, edit: response.key });
        const latency = Date.now() - start;
        await sock.sendMessage(mek.remoteJid, { text: `*${latency}ms*`, edit: response.key });
    }
});

// Wid command
cmd({
    pattern: "wid",
    description: "Get the user's or group's WA-ID.",
    type: "misc",
    isPremium: false,
    execute: async (m, sock, mek, config, startTime, sendButtonMessage) => {
        if (m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo && m.message.extendedTextMessage.contextInfo.remoteJid){
            if (!m.message.extendedTextMessage.contextInfo.participant){
                sock.sendMessage(mek.remoteJid, {text: m.message.extendedTextMessage.contextInfo.remoteJid});
            } else if (m.message.extendedTextMessage.contextInfo.participant){
                sock.sendMessage(mek.remoteJid, {text: m.message.extendedTextMessage.contextInfo.participant});
            }
        } else {
            sock.sendMessage(mek.remoteJid, {text: mek.remoteJid});
        }
    }
});


module.exports = commands, { cmd };