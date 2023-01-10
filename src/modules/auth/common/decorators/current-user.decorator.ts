import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = (property = 'user') =>
  createParamDecorator((_, context: ExecutionContext) => {
    return context.switchToHttp().getRequest()[property];
  })();
