function runGymRetail() {
  let choice;
  let orderCode = "";
  let isCodeValid = false;

  do {
    choice = prompt(
      " HỆ THỐNG QUẢN LÝ PHÒNG GYM \n" +
      "1. Nhập mã đơn hàng\n" +
      "2. Tính tiền & In hóa đơn\n" +
      "3. Thoát\n\n" +
      "Chọn chức năng (1-3):"
    );

    switch (choice) {
      case "1":
        let inputCode = prompt("Nhập mã đơn hàng (VD: vip-shaker-gloves hoặc nor-strap):");
        
        if (inputCode) {
          orderCode = inputCode.trim().toUpperCase();
          
          if (orderCode.length >= 8) {
            isCodeValid = true;
            console.log(`[Hệ thống] Đã ghi nhận mã đơn: ${orderCode}`);
            alert(`Thành công! Đã ghi nhận mã: ${orderCode}`);
          } else {
            isCodeValid = false;
            console.log("[Lỗi] Mã đơn quá ngắn.");
            alert("Mã đơn hàng phải có ít nhất 8 ký tự!");
          }
        }
        break;

      case "2":
        if (!isCodeValid) {
          alert("Vui lòng nhập mã đơn hàng hợp lệ ở Chức năng 1 trước!");
          break;
        }

        const isVip = orderCode.startsWith("VIP");
        const accessoriesPart = orderCode.slice(4); 
        const items = accessoriesPart.split("-");
        
        let subTotal = 0;
        let receiptDetails = "";

        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          let price = 0;
          
          if (item === "SHAKER") price = 120000;
          else if (item === "GLOVES") price = 180000;
          else if (item === "STRAP") price = 150000;
          else continue; 

          subTotal += price;
          
          let itemNameFormatted = `${i + 1}. ${item}`.padEnd(20, " ");
          let priceFormatted = `${price.toLocaleString()} VNĐ`.padStart(18, " ");
          receiptDetails += `${itemNameFormatted}${priceFormatted}\n`;
        }

        const discount = isVip ? (subTotal * 0.1) : 0;
        const finalTotal = subTotal - discount;

        const border = "-".repeat(40);
        const title = "HÓA ĐƠN BÁN LẺ".padStart(26, " ");
        
        let invoice = `\n${border}\n`;
        invoice += `${title}\n`;
        invoice += `${border}\n`;
        invoice += `Mã đơn    : ${orderCode}\n`;
        invoice += `Hội viên  : ${isVip ? "VIP (Giảm 10%)" : "Thường (Không giảm)"}\n`;
        invoice += `${border}\n`;
        invoice += receiptDetails;
        invoice += `${border}\n`;
        
        invoice += `Tổng tiền : ${(subTotal.toLocaleString() + " VNĐ").padStart(26, " ")}\n`;
        invoice += `Giảm giá  : ${("-" + discount.toLocaleString() + " VNĐ").padStart(26, " ")}\n`;
        invoice += `Thành tiền: ${(finalTotal.toLocaleString() + " VNĐ").padStart(26, " ")}\n`;
        invoice += `${border}\n`;

        console.log(invoice);
        alert("Đã in hóa đơn ra màn hình Console. Vui lòng nhấn F12 để xem!");
        
        isCodeValid = false; 
        orderCode = "";
        break;

      case "3":
        console.log("Đã đóng hệ thống. Tạm biệt!");
        break;

      default:
        console.log("[Lỗi] Lựa chọn Menu không hợp lệ.");
        alert("Vui lòng chỉ nhập số từ 1 đến 3!");
        break;
    }

  } while (choice !== "3");
}

runGymRetail();