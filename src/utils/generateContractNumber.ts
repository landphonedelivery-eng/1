export const generateContractNumber = () => {
  const year = new Date().getFullYear()
  const month = String(new Date().getMonth() + 1).padStart(2, "0")
  const random = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")
  return `C-${year}${month}-${random}`
}