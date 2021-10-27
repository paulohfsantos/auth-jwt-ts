import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    let success = false;

    if (req.headers.authorization) {
      const [authType, authToken] = req.headers.authorization.split(' ');
      if(authType === 'Bearer') {
        try {
          JWT.verify(
            authToken,
            process.env.JWT_SECRET_KEY as string
          );

          success = true;
        } catch (err) {
          console.log('errors right here');
        }
      }
    }

    if (success) {
      next();
    } else {
      res.status(401)
      res.json({error: 'Unauthorized'});
    }
  }
}