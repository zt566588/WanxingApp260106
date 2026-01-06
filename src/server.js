const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// 数据文件路径
const DATA_FILE = path.join(__dirname, 'data', 'links.json');

// 确保数据目录存在
if (!fs.existsSync(path.dirname(DATA_FILE))) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// 初始化数据文件
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// API路由
app.get('/api/links', (req, res) => {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).json({ error: '读取数据失败' });
    }
});

app.post('/api/links', (req, res) => {
    try {
        const { name, url, image } = req.body;
        if (!name || !url) {
            return res.status(400).json({ error: '名称和URL是必填项' });
        }
        const links = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        links.push({
            id: Date.now().toString(),
            name,
            url,
            image: image || 'https://via.placeholder.com/250x150?text=No+Preview'
        });
        fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: '保存数据失败' });
    }
});

app.delete('/api/links/:id', (req, res) => {
    try {
        const { id } = req.params;
        let links = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        links = links.filter(link => link.id !== id);
        fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: '删除数据失败' });
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.json({ success: true, token: 'fake-jwt-token' });
    } else {
        res.status(401).json({ error: '用户名或密码错误' });
    }
});

// 静态文件服务
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// 启动服务器 - 监听所有网络接口，支持外部访问
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 未来科技导航系统运行在 http://localhost:${PORT}`);
    console.log(`🌐 外部访问地址: http://0.0.0.0:${PORT}`);
    console.log(`📱 局域网访问: http://${require('os').networkInterfaces().eth0?.[0]?.address || '你的IP地址'}:${PORT}`);
    console.log(`🌟 管理员账号: admin / 密码: admin123`);
});