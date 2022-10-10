This is a reproduction of the swcMinify bug with using sheetjs xlsx to output an excel file.
https://docs.sheetjs.com/docs/

## Getting Started

Install deps:
```
npm install
```

dev mode works (click the "Click to Generate file!" button and then open the downloaded file in Excel/LibreOffice Calc)
```
npm run dev
```

in build/start, the resulting xls is corrupt. 
```
npm run build
npm run start
```

If you set swcMinify:false, it works again
