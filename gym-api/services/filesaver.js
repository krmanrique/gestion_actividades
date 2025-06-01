import fs from 'fs';

export class FileSaver {
  save(data) {
    fs.writeFileSync('orderData.json', JSON.stringify(data));
  }
}