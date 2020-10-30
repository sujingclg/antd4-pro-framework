import { Request, Response } from 'express';

const { delay } = require('roadhog-api-doc');

const proxy = {
  'GET /api/user_info': (req: Request, res: Response) => {
    // 查询当前用户
    // res.statusCode = 503;
    res.json({
      errno: 0,
      errmsg: 'succ',
      data: {
        name: '苏靖',
        username: 'sujing.su',
        picture:
          'https://lf3-ttcdn-tos.pstatp.com/img/lark.avatar/7e43f6e3-1466-4ca4-8326-fb40f8959263~72x72.png',
        email: 'sujing.su@bytedance.com',
        permission: 'admin', // read write none admin
      },
    });
  },
};

export default delay(proxy, 1000);
