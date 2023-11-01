import ExcelJS from 'exceljs';

const writeExcel = async(dt,res) => {
    
    console.log("excel...");
    //console.log(dt)
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet();

    const headers = Object.keys(dt[0]);
    console.log(headers)
    const row = sheet.addRow(headers);

    await dt.forEach(data => {
        const values = headers.map(header => data[header]);
        sheet.addRow(values);
    });

    //res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader("Content-Disposition", "attachment; filename=output.xlsx");
    await workbook.xlsx.write(res);
    await workbook.xlsx.writeFile('output.xlsx');

    workbook.xlsx.writeFile('output.xlsx')
    .then(() => {
        console.log("Excelファイルが作成されました")
        return;
    }).catch(error => {
        console.error("Excelファイルの作成中にエラーが発生しました", error);
    });

}

export default writeExcel;