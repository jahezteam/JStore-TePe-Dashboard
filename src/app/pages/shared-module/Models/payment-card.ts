export interface paymentCard {
  name: string;
  note: string;
  email: string;
  currency: string;
  amount: number;
  discountedAmount: number;
couponCode:string;
  userId: number;
  ids: number[];
  creditCard: card;
}
export interface card {
  name: string;
  cardNumber: string;
  expirationYear: string;
  expirationMonth: string;
  cvc: string;
}
