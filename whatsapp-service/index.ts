import makeWASocket, { 
    DisconnectReason, 
    useMultiFileAuthState, 
    fetchLatestBaileysVersion,
    makeCacheableSignalKeyStore
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';
import pino from 'pino';
import path from 'path';
import fs from 'fs';

const logger = pino({ level: 'info' });

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version, isLatest } = await fetchLatestBaileysVersion();
    
    console.log(`Usando WhatsApp v${version.join('.')}, isLatest: ${isLatest}`);

    const sock = makeWASocket({
        version,
        printQRInTerminal: true, // Requisito: Exibir QR Code no console
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, logger),
        },
        logger,
    });

    // Salvar sessão para não precisar escanear sempre (Requisito)
    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        if (qr) {
            console.log('--- SCANNEIE O QR CODE ABAIXO ---');
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexão fechada devido a:', lastDisconnect?.error, ', reconectando:', shouldReconnect);
            if (shouldReconnect) {
                connectToWhatsApp();
            }
        } else if (connection === 'open') {
            // Requisito: Mostrar no log quando conectar com sucesso
            console.log('\n✅ WHATSAPP CONECTADO COM SUCESSO!\n');
        }
    });

    // Ouvir mensagens (Opcional, mas útil para o CRM no futuro)
    sock.ev.on('messages.upsert', async m => {
        console.log('Nova mensagem recebida:', JSON.stringify(m, undefined, 2));
    });

    return sock;
}

// Iniciar o serviço
console.log('Iniciando Serviço de WhatsApp Baileys...');
connectToWhatsApp();
