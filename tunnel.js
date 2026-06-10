import localtunnel from 'localtunnel';
import fs from 'fs';

function writeUrl(url) {
  fs.writeFileSync('tunnel_url.txt', url, 'utf8');
  console.log('Tunnel URL written to tunnel_url.txt:', url);
}

async function startTunnel() {
  try {
    console.log('Connecting to localtunnel...');
    const tunnel = await localtunnel({ 
      port: 8000, 
      subdomain: 'taxops-secure-tunnel',
      local_host: '127.0.0.1'
    });

    console.log('Tunnel opened successfully at:', tunnel.url);
    writeUrl(tunnel.url);

    tunnel.on('close', () => {
      console.log('Tunnel connection closed. Reconnecting in 5 seconds...');
      setTimeout(startTunnel, 5000);
    });

    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });

  } catch (error) {
    console.error('Failed to start tunnel. Retrying in 10 seconds...', error.message);
    setTimeout(startTunnel, 10000);
  }
}

startTunnel();
