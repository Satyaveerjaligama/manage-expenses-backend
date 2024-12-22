export function generateUserId(type: string) {
  return type + "_" + Math.floor(100000 + Math.random() * 900000).toString();
}
