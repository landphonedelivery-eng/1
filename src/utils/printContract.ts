import { Booking } from '../types'

export const handlePrintContract = (booking: Booking) => {
  const contractContent = `
    عقد حجز اللوحات الإعلانية
    رقم العقد: ${booking.contractNumber}

    بيانات العميل:
    الاسم: ${booking.customerName}
    الهاتف: ${booking.customerPhone}
    البريد الإلكتروني: ${booking.customerEmail}
    ${booking.customerCompany ? `الشركة: ${booking.customerCompany}` : ""}

    تفاصيل الحجز:
    تاريخ البداية: ${booking.startDate}
    تاريخ النهاية: ${booking.endDate}
    المدة: ${booking.duration} يوم

    اللوحات المحجوزة:
    ${booking.billboards
      .map(
        (billboard) =>
          `- ${billboard.name} (${billboard.size}) - ${billboard.city} - ${billboard.totalPrice.toLocaleString()} د.ل`,
      )
      .join("\n    ")}

    المبلغ الإجمالي: ${booking.totalPrice.toLocaleString()} د.ل

    ${booking.notes ? `ملاحظات: ${booking.notes}` : ""}

    تاريخ إنشاء العقد: ${booking.createdAt}
  `

  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
      <html>
        <head>
          <title>عقد حجز - ${booking.contractNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; padding: 20px; }
            h1 { color: #2563eb; text-align: center; }
            .contract-content { white-space: pre-line; line-height: 1.6; }
          </style>
        </head>
        <body>
          <h1>عقد حجز اللوحات الإعلانية</h1>
          <div class="contract-content">${contractContent}</div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }
}