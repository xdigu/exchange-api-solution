import { Request, Response } from 'express';

import Service from '../services';
import { STATUS_CODE } from '../utils';

const service = new Service();

class Controller {
  async exchange(req: Request, resp: Response) {
    const { currency } = req.params;

    if (!currency) {
      return resp.status(STATUS_CODE.BAD_REQUEST).json({
        success: false,
        erro: 'you must pass "currency" parameter',
      });
    }

    const response = await service.exchange(currency as string);

    return resp.json({ success: true, message: 'hello world', data: response });
  }

  callback(req: Request, resp: Response) {
    const { body } = req;

    service.callBack(body);

    return resp.json({ sucess: true, message: 'tks' });
  }
}

export default Controller;
