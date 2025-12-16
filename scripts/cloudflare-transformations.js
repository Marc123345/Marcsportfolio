const fetch = require('node-fetch');

// Configuration
const CLOUDFLARE_ZONE_ID = '912f824b39d432b0b03c70909a14a2ab';
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;

if (!CLOUDFLARE_API_TOKEN) {
  console.error('Error: CLOUDFLARE_API_TOKEN environment variable is not set');
  process.exit(1);
}

// API endpoints
const TRANSFORMATIONS_ENDPOINT = `https://api.cloudflare.com/client/v4/zones/${CLOUDFLARE_ZONE_ID}/settings/transformations`;

// Headers for API requests
const headers = {
  'Authorization': `Bearer ${CLOUDFLARE_API_TOKEN}`,
  'Content-Type': 'application/json'
};

/**
 * Get current transformation settings
 */
async function getTransformationSettings() {
  try {
    const response = await fetch(TRANSFORMATIONS_ENDPOINT, {
      method: 'GET',
      headers
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error fetching transformation settings:', data.errors);
      return null;
    }
    
    console.log('Current transformation settings:');
    console.log(JSON.stringify(data.result, null, 2));
    return data.result;
  } catch (error) {
    console.error('Error fetching transformation settings:', error);
    return null;
  }
}

/**
 * Update transformation settings
 * @param {Object} settings - The new transformation settings
 */
async function updateTransformationSettings(settings) {
  try {
    const response = await fetch(TRANSFORMATIONS_ENDPOINT, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(settings)
    });
    
    const data = await response.json();
    
    if (!data.success) {
      console.error('Error updating transformation settings:', data.errors);
      return false;
    }
    
    console.log('Transformation settings updated successfully:');
    console.log(JSON.stringify(data.result, null, 2));
    return true;
  } catch (error) {
    console.error('Error updating transformation settings:', error);
    return false;
  }
}

/**
 * Enable image resizing
 */
async function enableImageResizing() {
  return updateTransformationSettings({
    value: {
      image_resizing: 'on',
      image_resizing_quality: 85,
      mirage: 'on'
    }
  });
}

/**
 * Enable Polish optimization
 */
async function enablePolish() {
  return updateTransformationSettings({
    value: {
      polish: 'lossless'
    }
  });
}

/**
 * Enable WebP conversion
 */
async function enableWebP() {
  return updateTransformationSettings({
    value: {
      webp: 'on'
    }
  });
}

// Command line interface
const command = process.argv[2];

async function main() {
  switch (command) {
    case 'get':
      await getTransformationSettings();
      break;
    case 'enable-resizing':
      await enableImageResizing();
      break;
    case 'enable-polish':
      await enablePolish();
      break;
    case 'enable-webp':
      await enableWebP();
      break;
    case 'enable-all':
      await enableImageResizing();
      await enablePolish();
      await enableWebP();
      break;
    default:
      console.log(`
Usage: node cloudflare-transformations.js [command]

Commands:
  get               Get current transformation settings
  enable-resizing   Enable image resizing
  enable-polish     Enable Polish optimization
  enable-webp       Enable WebP conversion
  enable-all        Enable all optimizations
      `);
  }
}

main().catch(console.error);