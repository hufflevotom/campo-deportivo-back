import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
	private logger = new Logger('HTTP');

	indice = 0;

	use(request: Request, response: Response, next: NextFunction): void {
		const { ip, method, originalUrl } = request;
		const userAgent = request.get('user-agent') || '';

		const now = Date.now();
		this.indice = this.indice + 1;
		const aa = this.indice;
		// ver peticion entrante
		if (originalUrl !== '/') {
			this.logger.log(`IN Index: ${aa} - ${method} ${originalUrl} ${ip}`);
		}

		// response.on('finish', () => {
		// 	const responseTime = Date.now() - now;
		// 	// convertir a segundos
		// 	const responseTimeInSeconds = Math.round(responseTime / 1000);
		// 	const { statusCode } = response;
		// 	// const contentLength = response.get('content-length');

		// 	if (statusCode >= 500) {
		// 		if (originalUrl !== '/') {
		// 			return this.logger.error(
		// 				`OUT Index: ${aa} TIME: ${responseTimeInSeconds} - ${method} ${originalUrl} ${statusCode} ${ip}`,
		// 			);
		// 		}
		// 	}

		// 	if (statusCode >= 400) {
		// 		if (originalUrl !== '/') {
		// 			return this.logger.warn(
		// 				`OUT Index: ${aa} TIME: ${responseTimeInSeconds} - ${method} ${originalUrl} ${statusCode} ${ip}`,
		// 			);
		// 		}
		// 	}

		// 	if (originalUrl !== '/') {
		// 		return this.logger.log(
		// 			`OUT Index: ${aa} TIME: ${responseTimeInSeconds} - ${method} ${originalUrl} ${statusCode} ${ip}`,
		// 		);
		// 	}
		// });

		next();
	}
}
