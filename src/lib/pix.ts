export function crc16(str: string): string {
  let crc = 0xFFFF;
  for (let c = 0; c < str.length; c++) {
    let char = str.charCodeAt(c);
    for (let i = 0; i < 8; i++) {
      let bit = ((char >> (7 - i)) & 1) === 1;
      let c15 = ((crc >> 15) & 1) === 1;
      crc <<= 1;
      if (c15 !== bit) crc ^= 0x1021;
    }
  }
  return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, "0");
}

export function generatePixPayload({
  key,
  name,
  city,
  amount,
}: {
  key: string;
  name: string;
  city: string;
  amount: number;
}): string {
  // Format key: cell numbers must include +55 prefix in standard PIX payloads
  let formattedKey = key.replace(/\D/g, "");
  if (/^\d{11}$/.test(formattedKey)) {
    formattedKey = "+55" + formattedKey;
  } else {
    formattedKey = key; // fallback to original key if not standard cell phone
  }

  const parts = {
    payloadFormat: "000201",
    pointOfInitiation: "010211", // static
    merchantAccount: "",
    mcc: "52040000",
    currency: "5303986",
    amount: "",
    country: "5802BR",
    name: "",
    city: "",
    additionalData: "62070503***",
  };

  // GUI + Key block
  const gui = "0014br.gov.bcb.pix";
  const keyTag = "01" + formattedKey.length.toString().padStart(2, "0") + formattedKey;
  const merchantAccountInfo = gui + keyTag;
  parts.merchantAccount = "26" + merchantAccountInfo.length.toString().padStart(2, "0") + merchantAccountInfo;

  // Amount block (only if > 0)
  if (amount > 0) {
    const amountStr = amount.toFixed(2);
    parts.amount = "54" + amountStr.length.toString().padStart(2, "0") + amountStr;
  }

  // Name (max 25 chars, uppercase, no accents)
  const cleanName = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z ]/g, "")
    .substring(0, 25)
    .trim();
  parts.name = "59" + cleanName.length.toString().padStart(2, "0") + cleanName;

  // City (max 15 chars, uppercase, no accents)
  const cleanCity = city
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase()
    .replace(/[^A-Z ]/g, "")
    .substring(0, 15)
    .trim();
  parts.city = "60" + cleanCity.length.toString().padStart(2, "0") + cleanCity;

  // Combine
  const payload =
    parts.payloadFormat +
    parts.pointOfInitiation +
    parts.merchantAccount +
    parts.mcc +
    parts.currency +
    parts.amount +
    parts.country +
    parts.name +
    parts.city +
    parts.additionalData +
    "6304";

  const crc = crc16(payload);
  return payload + crc;
}
