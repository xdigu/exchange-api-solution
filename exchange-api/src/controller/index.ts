import { Request, Response } from "express";

import { currencyService, observable } from "../services";
import { STATUS_CODE } from "../utils";

function validURL(str: string) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return pattern.test(str);
}

class Controller {
  async serviceA(req: Request, resp: Response) {
    const { moeda } = req.query;

    if (!moeda) {
      return resp.status(STATUS_CODE.BAD_REQUEST).json({
        erro: "Oh, no! Você precisa informar o parâmetro 'moeda'!",
      });
    }

    const currencyExchange = currencyService.serviceA(moeda as string);

    return resp
      .status(STATUS_CODE.SUCESS)
      .json({ cotacao: currencyExchange, moeda: moeda, symbol: "💵" });
  }

  async serviceB(req: Request, resp: Response) {
    const { curr } = req.query;

    if (!curr) {
      return resp.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({
        success: false,
        message: "📣 Oh, no! Você precisa informar o parâmetro 'curr'!",
      });
    }

    const currencyExchange = currencyService.serviceB(curr as string);

    const fator = 1000;

    return resp.status(STATUS_CODE.SUCESS).json({
      fator: fator,
      currency: curr,
      valor: (currencyExchange * fator).toString(),
    });
  }

  async serviceC(req: Request, resp: Response) {
    const { tipo, callback } = req.body;

    if (!tipo || !callback || !validURL(callback)) {
      return resp.status(STATUS_CODE.UNPROCESSABLE_ENTITY).json({
        mood: "⛔",
        erro: "Oh, no! Você precisa informar os parâmetros 'callback' com uma URL válida e 'tipo' para a moeda!",
        dica: "Provavelmente, você quer usar http://127.0.0.1:<porta> ou http://host.docker.internal:<porta> para que o docker acesse seu ambiente :)",
      });
    }

    observable.notify({
      callback: callback,
      type: tipo,
      cid: String(new Date().getTime()),
    });

    return resp.status(STATUS_CODE.SUCESS).json({
      mood: "✅",
      cid: new Date().getTime(),
      mensagem: `Quando a cotação finalizar, uma requisição para ${callback} será feita.`,
    });
  }
}

export default Controller;
