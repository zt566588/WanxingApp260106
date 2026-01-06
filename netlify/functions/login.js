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

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: '方法不允许' })
    };
  }

  try {
    console.log('Login function called with body:', event.body);
    
    const body = JSON.parse(event.body);
    const { username, password } = body;

    if (!username || !password) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: '用户名和密码是必填项' })
      };
    }

    // 简单的管理员认证（在生产环境中应该使用更安全的方式）
    if (username === 'admin' && password === 'admin123') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ 
          success: true, 
          token: 'fake-jwt-token',
          message: '登录成功'
        })
      };
    } else {
      return {
        statusCode: 401,
        headers: corsHeaders,
        body: JSON.stringify({ error: '用户名或密码错误' })
      };
    }
  } catch (err) {
    console.error('Login error:', err);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: '登录请求处理失败' })
    };
  }
};