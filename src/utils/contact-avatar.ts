function hashContactId(contactId: string) {
  let hash = 2166136261;
  for (let index = 0; index < contactId.length; index += 1) {
    hash ^= contactId.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function hslToHex(hue: number, saturation: number, lightness: number) {
  const normalizedSaturation = saturation / 100;
  const normalizedLightness = lightness / 100;
  const chroma =
    (1 - Math.abs(2 * normalizedLightness - 1)) * normalizedSaturation;
  const hueSection = hue / 60;
  const intermediate =
    chroma * (1 - Math.abs((hueSection % 2) - 1));
  const offset = normalizedLightness - chroma / 2;
  const [red, green, blue] =
    hueSection < 1
      ? [chroma, intermediate, 0]
      : hueSection < 2
        ? [intermediate, chroma, 0]
        : hueSection < 3
          ? [0, chroma, intermediate]
          : hueSection < 4
            ? [0, intermediate, chroma]
            : hueSection < 5
              ? [intermediate, 0, chroma]
              : [chroma, 0, intermediate];
  const toHex = (value: number) =>
    Math.round((value + offset) * 255)
      .toString(16)
      .padStart(2, '0');

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

export function getContactAvatarColors(contactId: string, isDark: boolean) {
  if (!contactId) {
    return null;
  }

  const hash = hashContactId(contactId);
  const hue = hash % 360;
  const saturation = 66 + ((hash >>> 9) % 20);
  const lightnessVariation = (hash >>> 16) % 9;

  return {
    backgroundColor: hslToHex(
      hue,
      isDark ? 50 + ((hash >>> 9) % 20) : saturation,
      isDark ? 20 + lightnessVariation : 87 + lightnessVariation,
    ),
    textColor: hslToHex(
      hue,
      65 + ((hash >>> 5) % 25),
      isDark
        ? 76 + ((hash >>> 19) % 13)
        : 26 + ((hash >>> 23) % 13),
    ),
  };
}
