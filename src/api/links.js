// 使用内存存储替代文件系统（Netlify Functions的serverless限制）
let linksData = [
  {
    "id": "1767600322126",
    "name": "DIM配装",
    "url": "https://app.destinyitemmanager.com/login",
    "image": "https://via.placeholder.com/250x150?text=DIM"
  }
];

// 模拟文件系统操作
function readData() {
  return linksData;
}

function writeData(data) {
  linksData = data;
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    console.log('Links function called:', event.httpMethod, event.path);
    
    switch (event.httpMethod) {
      case 'GET':
        // 获取所有链接
        const getLinks = readData();
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(getLinks)
        };

      case 'POST':
        // 添加新链接
        const body = JSON.parse(event.body);
        const { name, url, image } = body;
        
        if (!name || !url) {
          return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ error: '名称和URL是必填项' })
          };
        }

        const postLinks = readData();
        postLinks.push({
          id: Date.now().toString(),
          name,
          url,
          image: image || 'https://via.placeholder.com/250x150?text=No+Preview'
        });
        
        writeData(postLinks);
        
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ success: true })
        };

      case 'DELETE':
        // 删除链接
        const pathParts = event.path.split('/');
        const id = pathParts[pathParts.length - 1];
        let allLinks = readData();
        allLinks = allLinks.filter(link => link.id !== id);
        
        writeData(allLinks);
        
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ success: true })
        };

      default:
        return {
          statusCode: 405,
          headers: corsHeaders,
          body: JSON.stringify({ error: '方法不允许' })
        };
    }
  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: '服务器内部错误' })
    };
  }
};