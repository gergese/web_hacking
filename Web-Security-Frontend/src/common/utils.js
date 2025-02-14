export const parseJwtPayload = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/-/g, "/");
    const decodedPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(decodedPayload);
  } catch (error) {
    return null;
  }
};

export const getSessionItem = (key) => {
  const stored = JSON.parse(sessionStorage.getItem(key));

  if (stored && stored.token) {
    return {
      token: stored.token,
      payload: parseJwtPayload(stored.token),
    };
  } else {
    return null;
  }
};

export const formattedPrice = (price) => {
  return price.toLocaleString();
};

export const formattedDate = (date) => {
  // UTC 문자열을 JavaScript Date 객체로 파싱합니다.
  const utcDate = new Date(date);

  // 한국 표준시(KST)로 변환합니다.
  const kstDate = new Date(utcDate.getTime() + 0 * 60 * 60 * 1000);

  // 날짜와 시간 정보 추출
  const kstYear = kstDate.getFullYear();
  const kstMonth = kstDate.getMonth() + 1; // 월 (0부터 시작하므로 +1 해줍니다)
  const kstDay = kstDate.getDate(); // 일

  // "-월 -일 -시 -분" 형식으로 변환
  const formattedKST = `${kstYear}년 ${kstMonth}월 ${kstDay}일`;

  return formattedKST;
};
