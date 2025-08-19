const datesInRange = (startDate: Date | null, endDate: Date | null) => {
  if (startDate && endDate) {
    const dateArray: string[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      // 월과 일을 두 자리로 포맷팅
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const day = String(currentDate.getDate()).padStart(2, '0');

      // 'MM-DD' 형식으로 배열에 추가
      dateArray.push(`${month}-${day}`);

      // 다음 날로 이동
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  } else {
    console.log('날짜 값이 올바르지 않습니다');
  }
};

export default datesInRange;
