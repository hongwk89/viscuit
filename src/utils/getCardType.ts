const getCardType = (cardNumber: string) => {
  const cleaned = cardNumber.replace(/\s/g, ''); // 숫자만 남김

  // 카드 네트워크별 패턴
  const cardPatterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^(5[1-5][0-9]{4}|2[2-7][0-9]{4})[0-9]{10}$/,
    american_express: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/,
    diners_club: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    unionpay: /^62[0-9]{14,17}$/,
  };

  // 카드 번호와 각 패턴을 매칭
  for (const card in cardPatterns) {
    if (cardPatterns[card as keyof typeof cardPatterns].test(cleaned)) {
      return card;
    }
  }

  return ''; // 카드 종류를 알 수 없을 때
};
export default getCardType;
