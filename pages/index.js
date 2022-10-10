import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import * as XLSX from "xlsx";

export default function Home() {

  return ( <button onClick={async () => {
    /* fetch JSON data and parse */
    const url = "https://sheetjs.com/data/executive.json";
    const raw_data = await (await fetch(url)).json();

    /* filter for the Presidents */
    const prez = raw_data.filter(row => row.terms.some(term => term.type === "prez"));

    /* flatten objects */
    const rows = prez.map(row => ({
      name: row.name.first + " " + row.name.last,
      birthday: row.bio.birthday
    }));

    /* generate worksheet and workbook */
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [["Name", "Birthday"]], { origin: "A1" });

    /* calculate column width */
    const max_width = rows.reduce((w, r) => Math.max(w, r.name.length), 10);
    worksheet["!cols"] = [ { wch: max_width } ];

    /* create an XLSX file and try to save to Presidents.xlsx */
    XLSX.writeFile(workbook, "Presidents.xlsx");
  }}><b>Click to Generate file!</b></button> );

}
