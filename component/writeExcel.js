import ExcelJS from 'exceljs';

const writeExcel = (dt) => {
    
    console.log("excel...");
    console.log(dt)
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet();

    const headers = Object.keys(dt[0]);
    console.log(headers)
    const row = sheet.addRow(headers);

    dt.forEach(data => {
        const values = headers.map(header => data[header]);
        sheet.addRow(values);
    });

    row.eachCell((cell, number) => {
        sheet.column(number).setWidth(cell.value.toString())
    })

    sheet.fitToWidth

    workbook.xlsx.writeFile('output.xlsx')
    .then(() => {
        console.log("Excelファイルが作成されました")
    }).catch(error => {
        console.error("Excelファイルの作成中にエラーが発生しました", error);
    });

}

export default writeExcel;