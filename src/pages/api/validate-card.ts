import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { token } = req.body;

    try {
      const charge = await stripe.charges.create({
        amount: 100, // 금액 (예: 1.00 USD)
        currency: 'usd',
        source: token, // 클라이언트에서 받은 토큰
        description: 'Test charge',
      });

      // 결제가 성공하면 즉시 취소 (환불)
      const refund = await stripe.refunds.create({
        charge: charge.id,
      });

      res.status(200).send({
        success: true,
        message: 'Card validated and charge refunded',
      });
    } catch (error: unknown) {
      // error가 Error 객체인지 확인하고 처리
      if (error instanceof Error) {
        return res.status(400).json({ success: false, error: error.message });
      }

      // 예상치 못한 오류의 경우 기본 오류 메시지 반환
      return res.status(400).json({ success: false, error: 'An unknown error occurred' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
