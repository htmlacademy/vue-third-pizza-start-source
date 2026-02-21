export function getAddressKey(address) {
  const street = (address.street || "").trim().toLowerCase();
  const building = (address.building || "").trim().toLowerCase();
  const flat = (address.flat || "").trim().toLowerCase();
  const comment = (address.comment || "").trim().toLowerCase();

  return `${street}|${building}|${flat}|${comment}`;
}
